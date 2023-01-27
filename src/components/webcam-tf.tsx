import { useEffect, useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

interface Props {
	URL: string;
	setPrediction: (prediction: string) => void;
	setProbability: (probability: number) => void;
}

export default function WebCam({ URL, setPrediction, setProbability }: Props) {
	const webcamContainer = useRef<HTMLDivElement>(null);
	let webcam = useRef<Webcam>(null);

	let video: HTMLVideoElement | null;
	let model: tf.LayersModel;
	let labels: string[];

	async function init() {
		model = await tf.loadLayersModel('/data/model.json');
		const metadata = await (await fetch('/data/metadata.json')).json();
		labels = metadata.labels;

		window.requestAnimationFrame(loop);
	}

	async function loop() {
		video = webcam.current!.video;
		await predict();
		window.requestAnimationFrame(loop);
	}

	async function predict() {
		if (video) {
			// Get the image data from the video element
			const webcamImage = await tf.browser.fromPixels(video);

			// Crop the image so we're using the center square of the rectangular
			// webcam.
			const croppedImage = cropImage(webcamImage);

			// Expand the outer most dimension so we have a batch size of 1.
			const batchedImage = croppedImage.expandDims(0);

			// Make a prediction through mobilenet.
			const predictions = await model.predict(batchedImage) as tf.Tensor;

			// Turn predictions into a 1D array and find the index with the maximum
			// probability. The number corresponds to the class the model thinks is
			// the most probable given the input.
			const classId = (await predictions.as1D().argMax()).dataSync()[0];

			// Turn the class index into a human readable label.
			setPrediction(labels[classId]);

			// Turn the predictions into a 1D array and find the maximum probability.
			setProbability((await predictions.as1D().max()).dataSync()[0]);

			// Dispose the tensor to release the memory.
			webcamImage.dispose();
			croppedImage.dispose();
			batchedImage.dispose();
			predictions.dispose();
		}
	}

	function cropImage(img: tf.Tensor3D) {
		const size = 224;
		const centerHeight = img.shape[0] / 2;
		const beginHeight = centerHeight - (size / 2);
		const centerWidth = img.shape[1] / 2;
		const beginWidth = centerWidth - (size / 2);
		return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
	}


	useEffect(() => {
		init();
	}, []);

	const videoConstraints = {
		width: webcamContainer.current?.offsetWidth,
		height: webcamContainer.current?.offsetWidth,
		facingMode: { exact: "environment" }
	};

	return (
		<>
			<div ref={webcamContainer}
				style={
					{
						display: "inline-block",
						width: "100%",
						height: "100%",
						borderRadius: "100%",
					}
				}
			>
				<Webcam ref={webcam}
					audio={false}
					screenshotFormat="image/png"
					videoConstraints={videoConstraints}
					width={webcamContainer.current?.offsetWidth}
					height={webcamContainer.current?.offsetWidth} />
			</div>
		</>
	)
}