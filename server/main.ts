import express, { Express, Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node"

const app: Express = express();
const port = 8080;

app.get('/predict', (req: Request, res: Response) => {
  const { image: rawImage } = JSON.parse(req.body);

  const image = preprocessImage(rawImage);

  res.status(200).json({ message: "hi" });
})

app.listen(port, () => {
  console.log("[server]: Server is ready.");
})

function preprocessImage(rawImage: string): tf.Tensor {

  // strip the headers
  // https://stackoverflow.com/a/57886214
  const image = rawImage.split(';base64,').pop();
  const imageBuffer = Buffer.from(image!, 'base64');
  const imageTensor = tf.node.decodeImage(imageBuffer);

  // TODO
}

