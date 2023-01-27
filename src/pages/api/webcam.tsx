import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';

import * as tmImage from '@teachablemachine/image';

interface Props {
    URL: string;
    setPrediction: (prediction: string) => void;
    setProbability: (probability: number) => void;
}

export default function WebCam({ URL, setPrediction, setProbability }: Props) {
    let webcam: tmImage.Webcam;
    let model: tmImage.CustomMobileNet;
    let maxPredictions: number;

    const webcamContainer = useRef<HTMLDivElement>(null);

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // get the minimum width and height of the webcam bazed on the screen size
        const size = webcamContainer.current!.offsetWidth;
        webcam = new tmImage.Webcam(size, size, true);

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        webcamContainer.current!.append(webcam.canvas);
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        let maxPredictionIndex = 0;

        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability > prediction[maxPredictionIndex].probability) {
                maxPredictionIndex = i;
            }
        }

        setPrediction(prediction[maxPredictionIndex].className);
        setProbability(prediction[maxPredictionIndex].probability);
    }

    useEffect(() => {
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
                        borderRadius: "100%",
                    }
                }
            />
        </>
    )
}