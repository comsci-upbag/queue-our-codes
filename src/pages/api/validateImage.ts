import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"

const prisma = new PrismaClient();

interface Prediction {
  label: string,
  probability: number,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

  if (!session) {
    res.status(404).json({ messages: "No logged in account." });
    return;
  }

  const participant = await prisma.participantStatus.findUnique({ where: { email: session.user.email } })
  const result = await fetch(process.env.IMAGE_VALIDATION_SERVER + '/', { method: "POST", headers: { "Content-Type": "application/json" }, body: req.body });

  const { label, probability } = await result.json() as Prediction;

  res.status(200).json({ label, probability });
}
