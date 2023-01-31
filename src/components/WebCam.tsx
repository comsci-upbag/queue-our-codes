import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import * as tf from "@tensorflow/tfjs";

import LoadingIndicator from "./LoadingIndicator";

import styles from "@/styles/WebCam.module.css";

interface props {
  setPrediction: (prediction: string | null) => void;
  setProbability: (probability: number | null) => void;
}

let model: tf.GraphModel;

export default function WebCam({ setPrediction, setProbability }: props) {
  const webcamContainer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [shouldTakePicture, setShouldTakePicture] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isModelReady, setIsModelReady] = useState<boolean>(false);
  const [currentCamera, setCurrentCamera] = useState<"user" | "environment">("environment");

  const labels: string[] = [
    "random-image",
    "white-cat-yellow-head",
    "cat12",
    "black-cat",
    "white-cat-black-head",
    "white-cat-black-ears",
    "white-cat-black-tail",
    "cat6",
    "cat7",
    "cat8",
    "not-up-cat",
    "random-image",
    "up-background"
  ];

  async function predict() {
    if (!video) return;
    if (!model) await initializeModel();

    tf.tidy(() => {
      // ensure video is ready
      if (video.current?.readyState !== video.current?.HAVE_ENOUGH_DATA) return;

      // Get the image data from the video element
      const webcamImage = tf.browser.fromPixels(video.current!);

      // Crop the image so we're using the center square of the rectangular
      // webcam.
      const croppedImage = cropImage(webcamImage);

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = croppedImage.expandDims(0);

      // Make a prediction through mobilenet.
      const prediction = model.predict(batchedImage) as tf.Tensor;

      // Turn predictions into a 1D array to find the most probable class
      prediction.as1D().argMax().data().then((data) => {
        setPrediction(labels[data[0]]);
      });

      prediction.as1D().max().data().then((data) => {
        setProbability(data[0]);
      });

      // Dispose the tensor to release the memory.
      webcamImage.dispose();
      croppedImage.dispose();
      batchedImage.dispose();
      prediction.dispose();
    });

    if (isCameraReady) window.requestAnimationFrame(predict);
  }

  function cropImage(img: tf.Tensor3D) {
    const size = 384;
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);

    // normalise the image between 0 and 1
    const normalized = img.toFloat().div(tf.scalar(255));

    // Crop the image so we're using the center square of the rectangular
    return normalized.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  }

  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  function enableCamera() {
    if (!hasGetUserMedia()) {
      console.warn('getUserMedia() is not supported by your browser');
      return;
    }

    // getUsermedia parameters.
    const constraints = {
      video: { facingMode: currentCamera },
      width: webcamContainer.current?.clientWidth,
      height: webcamContainer.current?.clientWidth,
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      video.current!.srcObject = stream;
      video.current?.addEventListener('loadeddata', function () {
        video.current!.play();
        setIsCameraReady(true);
        setShouldTakePicture(true);
        video.current!.style.display = "block";

        // get current camera facing mode
        const facingMode = stream.getVideoTracks()[0].getSettings().facingMode;
        if (facingMode === "environment") setCurrentCamera("environment");
        else if (facingMode === "user") setCurrentCamera("user");
        else setCurrentCamera("user");
      });
    });

    initializeModel();
  }

  const initializeModel = async () => {
    // Load the model.
    try {
      console.log("loading model from indexeddb");
      model = await tf.loadGraphModel('indexeddb://my-model')
      console.log("model loaded from indexeddb");
    } catch (e) {
      console.log("loading model from local storage");
      model = await tf.loadGraphModel('/data/upb-cat-detector/model.json');
      model.save('indexeddb://my-model');
      console.log("model loaded from local storage");
    }

    setIsModelReady(true);
    window.requestAnimationFrame(predict);
  };

  function stopCurrentCamera() {
    if (video.current?.srcObject) {
      const stream = video.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      video.current.srcObject = null;
      video.current!.style.display = "none";

      setShouldTakePicture(false);
      setTimeout(() => {
        setProbability(null);
      }, 500);
    }
  }

  function switchCamera() {
    stopCurrentCamera();
    if (currentCamera === "user") setCurrentCamera("environment");
    else setCurrentCamera("user");
    enableCamera();
  }

  return (
    <>
      <div ref={webcamContainer} className={styles.WebCamContainer}>
        <video ref={video} autoPlay playsInline muted width="100%" height="100%" style={{ display: "none" }} />
        {
          shouldTakePicture ?
            <div className={styles.CameraControls}>
              {!isModelReady && isCameraReady && <LoadingIndicator />}
              <button onClick={stopCurrentCamera}>
                <Image src="/stop-camera.svg" alt="stop camera" width={32} height={32} />
              </button>
              <button onClick={switchCamera}>
                {currentCamera === "user" ?
                  <Image src="/switch-rear.svg" alt="switch camera" width={32} height={32} />
                  :
                  <Image src="/switch-front.svg" alt="switch camera" width={32} height={32} />
                }
              </button>
              {/* <button onClick={predict}>
                {isModelReady && isCameraReady && <Image src="/take-picture.svg" alt="take picture" width={32} height={32} />}
              </button> */}
            </div>
            :
            <button className={styles.EnableButton} onClick={enableCamera}>Enable Webcam</button>
        }
      </div>
    </>
  )
}
