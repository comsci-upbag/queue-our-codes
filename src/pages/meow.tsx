import { useEffect, useState, useRef } from 'react';

import * as tmImage from '@teachablemachine/image';

export default function Meow() {
    const URL = "https://teachablemachine.withgoogle.com/models/QJqiovVqX/";

    const [prediction, setPrediction] = useState<string | null>(null);
    const [probability, setProbability] = useState<number | null>(null);

    let webcam = new tmImage.Webcam(200, 200, true);

    let model: tmImage.CustomMobileNet;
    let maxPredictions: number;

    const webcamContainer = useRef<HTMLDivElement>(null);

    init();

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

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


        if (webcamContainer.current !== null && webcamContainer.current!.children.length == 0 && webcam.canvas !== undefined) {
            webcamContainer.current!.append(webcam.canvas);
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
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
        if (webcamContainer.current !== null && webcamContainer.current!.children.length == 0 && webcam.canvas !== null && webcam.canvas !== undefined) {
            webcamContainer.current!.append(webcam.canvas);
        }
    }, [webcamContainer, webcam.canvas !== null]);


    return (
        <>
            <div ref={webcamContainer}
                style={
                    {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }
                }
            />
            <div style={
                {
                    position: "absolute",
                    top: "70%",
                    left: "50%",
                }
            }>
                <div>{prediction}</div>
                <div>{probability}</div>
            </div>
        </>
    )
}