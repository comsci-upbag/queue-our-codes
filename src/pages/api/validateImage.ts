import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { isAnswerCorrect } from "@/globals/answers";
import { prisma } from "@/globals/prisma"


interface Prediction {
  label: string,
  probability: number,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

  if (!session) {
    res.status(404).json({ message: "No logged in account." });
    return;
  }

  const participant = await prisma.participantStatus.findUnique({ where: { email: session.user.email } })
  const result = await fetch(process.env.IMAGE_VALIDATION_SERVER + '/', { method: "POST", headers: { "Content-Type": "application/json" }, body: req.body });

  const { label, probability } = await result.json() as Prediction;

  if (!participant) {
    res.status(404).json({ message: "Participant is not registered" });
    return;
  }

  if (!isAnswerCorrect("image", participant.current_puzzle, label)) {
    res.status(200).json({ isAnswerCorrect: false });
    return;
  }

  res.status(200).json({ isAnswerCorrect: true, label, probability });
}
