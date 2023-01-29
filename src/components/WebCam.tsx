import { useEffect, useRef } from "react";

import * as tf from "@tensorflow/tfjs";

interface props {
	setPrediction: (prediction: string) => void;
	setProbability: (probability: number) => void;
}

export default function WebCam({ setPrediction, setProbability }: props) {
	const webcamContainer = useRef<HTMLDivElement>(null);
	const video = useRef<HTMLVideoElement>(null);
	const loadingIndicator = useRef<HTMLDivElement>(null);

	let model: tf.GraphModel;

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

	async function init() {
		model = await tf.loadGraphModel('/data/upb-cat-detector/model.json');

		window.requestAnimationFrame(predict);
	}

	async function predict() {
    if (!video) return;

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
        if (loadingIndicator.current) {
          loadingIndicator.current.remove();
          video.current!.style.display = "block";
        }
      });

      // Dispose the tensor to release the memory.
      webcamImage.dispose();
      croppedImage.dispose();
      batchedImage.dispose();
      prediction.dispose();
    });

		window.requestAnimationFrame(predict);
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

	function enableCam() {
    if (!hasGetUserMedia())  {
			console.warn('getUserMedia() is not supported by your browser');
      return;
    }
      
    // getUsermedia parameters.
    const constraints = {
      video: { facingMode: 'environment' },
      width: webcamContainer.current?.clientWidth,
      height: webcamContainer.current?.clientWidth,
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      video.current!.srcObject = stream;
      video.current?.addEventListener('loadeddata', function () {
        video.current!.play();
      });
    });
	}

	useEffect(() => {
		enableCam();
		init();
	}, []);

	return (
		<>
			<div ref={webcamContainer}
				style={
					{
						display: "inline-block",
						width: "100%",
						height: "100%",
					}
				}
			>
				<div ref={loadingIndicator} style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
					<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
					<style jsx>{`
						.lds-ellipsis {
							display: inline-block;
							position: relative;
							width: 80px;
							height: 80px;
						}
						.lds-ellipsis div {
							position: absolute;
							top: 33px;
							width: 13px;
							height: 13px;
							border-radius: 50%;
							background: var(--color3);
							animation-timing-function: cubic-bezier(0, 1, 1, 0);
						}
						.lds-ellipsis div:nth-child(1) {
							left: 8px;
							animation: lds-ellipsis1 0.6s infinite;
						}
						.lds-ellipsis div:nth-child(2) {
							left: 8px;
							animation: lds-ellipsis2 0.6s infinite;
						}
						.lds-ellipsis div:nth-child(3) {
							left: 32px;
							animation: lds-ellipsis2 0.6s infinite;
						}
						.lds-ellipsis div:nth-child(4) {
							left: 56px;
							animation: lds-ellipsis3 0.6s infinite;
						}
						@keyframes lds-ellipsis1 {
							0% {
								transform: scale(0);
							}
							100% {
								transform: scale(1);
							}
						}
						@keyframes lds-ellipsis3 {
							0% {
								transform: scale(1);
							}
							100% {
								transform: scale(0);
							}
						}
						@keyframes lds-ellipsis2 {
							0% {
								transform: translate(0, 0);
							}
							100% {
								transform: translate(24px, 0);
							}
						}

						`}</style>
				</div>
				<video ref={video} autoPlay playsInline muted width="100%" height="100%" style={{ display: "none" }} />
			</div>
		</>
	)
}
