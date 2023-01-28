import { useEffect, useRef } from "react";

import * as tf from "@tensorflow/tfjs";

interface Props {
	URL: string;
	setPrediction: (prediction: string) => void;
	setProbability: (probability: number) => void;
}

export default function WebCam({ URL, setPrediction, setProbability }: Props) {
	const webcamContainer = useRef<HTMLDivElement>(null);
	const video = useRef<HTMLVideoElement>(null);

	let model: tf.LayersModel;
	let labels: string[];

	async function init() {
		model = await tf.loadLayersModel('/data/model.json');
		// const metadata = await (await fetch('/data/metadata.json')).json();
		labels = [
			"white-cat-yellow-head",
			"black-cat",
			"white-cat-black-head",
			"white-cat-black-ears",
			"white-cat-black-tail",
			"cat6",
			"cat7",
			"cat8",
			"cat12",
			"not-up-cat",
			"random-images"]

		window.requestAnimationFrame(predict);
	}

	async function predict() {
		if (video) {
			tf.tidy(() => {
				// check if the video is ready
				if (video.current?.readyState === video.current?.HAVE_ENOUGH_DATA) {

					// Get the image data from the video element
					const webcamImage = tf.browser.fromPixels(video.current!);

					// Crop the image so we're using the center square of the rectangular
					// webcam.
					const croppedImage = cropImage(webcamImage);

					// Expand the outer most dimension so we have a batch size of 1.
					const batchedImage = croppedImage.expandDims(0);

					// Make a prediction through mobilenet.
					const prediction = model.predict(batchedImage) as tf.Tensor;

					// Turn predictions into a 1D array and find the index with the maximum
					// probability. The number corresponds to the class the model thinks is
					// the most probable given the input.
					const classId = (prediction.as1D().argMax()).dataSync()[0];

					// Turn the class index into a human readable label.
					setPrediction(labels[classId]);

					// Turn the predictions into a 1D array and find the maximum probability.
					setProbability((prediction.as1D().max()).dataSync()[0]);

					// Dispose the tensor to release the memory.
					webcamImage.dispose();
					croppedImage.dispose();
					batchedImage.dispose();
					prediction.dispose();
				}
			});
		}
		window.requestAnimationFrame(predict);
	}

	function cropImage(img: tf.Tensor3D) {
		const size = 224;
		const centerHeight = img.shape[0] / 2;
		const beginHeight = centerHeight - (size / 2);
		const centerWidth = img.shape[1] / 2;
		const beginWidth = centerWidth - (size / 2);

		// normalise the image between -1 and 1
		const normalized = img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));

		// Crop the image so we're using the center square of the rectangular
		return normalized.slice([beginHeight, beginWidth, 0], [size, size, 3]);
	}

	function hasGetUserMedia() {
		return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	}

	function enableCam() {
		if (hasGetUserMedia()) {
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
		} else {
			console.warn('getUserMedia() is not supported by your browser');
		}
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
				<video ref={video} autoPlay playsInline muted width="100%" height="100%" />
			</div>
		</>
	)
}