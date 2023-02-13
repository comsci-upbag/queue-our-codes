import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"

import { isAnswerCorrect } from "@/globals/answers"
import { prisma } from "@/globals/prisma"


const context = new Map([
  [1, false],
  [2, false],
  [3, false],
  [4, false],
  [5, false],
  [6, false],
  [7, false],
  [8, true],
  [9, false],
  [10, false],
])

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

  if (!session) {
    res.status(404).json({ message: "No logged in account." });
    return;
  }

  const participant = await prisma.participantStatus.findUnique({ where: { email: session.user.email } });

  if (!participant) {
    res.status(404).json({ message: "Pariticipant is not registered on the database" });
    return;
  }

  const { answer } = JSON.parse(req.body) as { answer: string };

  if (!isAnswerCorrect("qrcode", participant!.current_puzzle, answer)) {
    res.status(200).json({ isAnswerCorrect: false });
    return;
  }

  // update participant data
  if (context.get(participant.current_puzzle)) {
    await prisma.participantStatus.update({
      where: {
        email: session.user.email,
      },
      data: {
        current_puzzle: participant.current_puzzle + 1,
      }
    })
  }

  res.status(200).json({ isAnswerCorrect: true });
}
