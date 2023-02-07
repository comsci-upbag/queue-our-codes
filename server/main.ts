import express, { Express, Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node"

const app: Express = express();
const port = 8080;

let model: tf.GraphModel | null = null;

const labels = [
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
  "up-background",
]

app.get('/', async (req: Request, res: Response) => {

  // Initialize Model
  if (!model)
    model = await tf.loadGraphModel(`./data/upb-cat-detector/model.json`);

  const { image: rawImage } = JSON.parse(req.body);

  const image = preprocessImage(rawImage);

  if (!image) {
    res.status(404).json({message: "request is not a valid image"});
    return;
  }

  const prediction = model.predict(image) as tf.Tensor;
  const { label, probability } = await getLabelAndProbability(prediction);

  res.status(200).json({ label, probability });

  image.dispose();
  prediction.dispose();
})

app.listen(port, () => {
  console.log(`[server]: Server is ready at port: ${port}`);
})

function preprocessImage(rawImage: string): tf.Tensor | null {

  // strip the headers
  // https://stackoverflow.com/a/57886214
  const image = rawImage.split(';base64,').pop();
  const imageBuffer = Buffer.from(image!, 'base64');

  let imageTensor= null;
  try {
    imageTensor = tf.node.decodeImage(imageBuffer) as tf.Tensor3D;
  } catch(_) {
    return null;
  }

  // crop the image
  const croppedImage = cropImage(imageTensor, 384);
  
  // normalize the image
  const normalizedImage = croppedImage.toFloat().div(tf.scalar(255));
  const batchedImage = normalizedImage.expandDims(0);

  imageTensor.dispose();
  croppedImage.dispose();
  normalizedImage.dispose();

  return batchedImage;
}

function cropImage(image: tf.Tensor3D, size: number): tf.Tensor {
  const centerHeight = image.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = image.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);

  return image.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

async function getLabelAndProbability(prediction: tf.Tensor): Promise<{ label: string, probability: number}> {

  const index = (await prediction.as1D().argMax().data())[0];
  const probability = (await prediction.as1D().max().data())[0];

  return {label: labels[index], probability};
}

