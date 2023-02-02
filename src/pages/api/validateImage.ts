
import { NextApiRequest, NextApiResponse } from "next";
import * as tf from "@tensorflow/tfjs-node"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { image } = JSON.parse(req.body);

  // TODO: convert image to tensor
  const buffer = Buffer.from(image, 'base64');
  console.log(image);

  const imageTensor = tf.node.decodeImage(buffer);

  console.log(imageTensor);


  res.status(200).json({message: "hi"});

}
