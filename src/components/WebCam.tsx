import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import * as tf from "@tensorflow/tfjs";

import LoadingIndicator from "./LoadingIndicator";

import styles from "@/styles/WebCam.module.css";

let model: tf.GraphModel | null = null;
let continuePredicting = false;

export default function WebCam() {
  const webcamContainer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [prediction, setPrediction] = useState<string | null>(null);
  const [probability, setProbability] = useState<number | null>(null);

  const [isCameraEnabled, setIsCameraEnabled] = useState<boolean>(false);
  const [isPredicting, setIsPredicting] = useState<boolean>(continuePredicting);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
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

  async function initializeModel() {
    if (model !== null) return;

    await tf.loadGraphModel('indexeddb://my-model').then((loadedModel) => {
      model = loadedModel;
      setIsModelLoaded(true);
      console.log("model loaded from indexedDB")
    })
      .catch(async () => {
        let loadedModel = await tf.loadGraphModel('/data/upb-cat-detector/model.json').catch(() => {
          console.log("model not found");
          return null;
        });
        loadedModel!.save('indexeddb://my-model');
        console.log("model loaded from local storage")
        setIsModelLoaded(true);
        return loadedModel;
      })
  }

  async function predict() {
    tf.tidy(() => {
      // Get the image data from the video element
      const webcamImage = tf.browser.fromPixels(video.current!);

      // Crop the image so we're using the center square of the rectangular
      // webcam.
      const croppedImage = cropImage(webcamImage);

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = croppedImage.expandDims(0);

      // Make a prediction through mobilenet.
      const prediction = model!.predict(batchedImage) as tf.Tensor;

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

    if (continuePredicting) requestAnimationFrame(() => predict());
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

  async function enableCamera() {
    if (!(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))) {
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
    video.current!.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
    await video.current!.load();
    await video.current!.play();
    video.current!.style.display = "block";

    // get the actual video facing mode
    const track = video.current!.srcObject!.getTracks()[0];
    const settings = track.getSettings();
    const facingMode = settings.facingMode;

    setCurrentCamera(facingMode === "user" ? "user" : "environment");
    setIsCameraEnabled(true);
  }

  function stopCurrentCamera() {
    if (video.current?.srcObject) {
      const stream = video.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      video.current.srcObject = null;
      video.current!.style.display = "none";

      if (isPredicting) togglePrediction();
      setIsCameraEnabled(false);
    }
  }

  async function switchCamera() {
    setCurrentCamera(() => {
      if (currentCamera === "user") {

        return "environment";
      } else {
        return "user";
      }
    });
  }

  async function togglePrediction() {
    setIsPredicting(() => {
      if (isPredicting) {
        continuePredicting = false;
        return false;
      } else {
        continuePredicting = true;
        predict();
        return true;
      }
    });
  }

  return (
    <>
      <div ref={webcamContainer} className={styles.WebCamContainer}>
        <video ref={video} autoPlay playsInline muted width="100%" height="100%" style={{ display: "none" }} />
        {
          isCameraEnabled ?
            <div className={styles.CameraControls}>
              {!isModelLoaded && <LoadingIndicator />}
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
              <button onClick={togglePrediction}>
                {isPredicting ?
                  <Image src="/toggle-on.svg" alt="stop prediction" width={32} height={32} />
                  :
                  <Image src="/toggle-off.svg" alt="start prediction" width={32} height={32} />
                }
              </button>
            </div>
            :
            <button className={styles.EnableButton} onClick={async () => {
              await enableCamera();
              await initializeModel();
              await togglePrediction();
            }}>Start Looking</button>
        }
      </div>
      {isPredicting && probability && <p>You are showing a {prediction} with a {((probability * 100).toFixed(2))}% confidence on our side!</p>}
      {isPredicting && prediction === "white-cat-yellow-head" && probability! > 0.5 && <p>You got it! The answer is all yours!</p>}
    </>
  )
}
