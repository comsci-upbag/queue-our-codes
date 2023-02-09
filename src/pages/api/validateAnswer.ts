
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

import { getSession } from "next-auth/react"
import { isAnswerCorrect } from "../../globals/answers";


interface PuzzleAnswer {
  puzzleId: number,
  answer: string,
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { answer } = JSON.parse(req.body) as PuzzleAnswer;
  const session = await getSession({ req });

  if (!session) {
    res.status(404).json({ messages: "No logged in account." });
    return;
  }

  const participant = await prisma.participantStatus.findUnique({
    where: {
      email: session.user.email
    }
  })

  // handle when participant is not registered to the database
  if (!participant) {
    res.status(404).json({ messages: "Account is not registered." });
    return;
  }

  const puzzleId = participant.current_puzzle;

  if (!isAnswerCorrect("text", puzzleId, answer)) {
    res.status(200).json({ isAnswerCorrect: false });
    return;
  }

  // update participant data
  await prisma.participantStatus.update({
    where: {
      email: session.user.email,
    },
    data: {
      current_puzzle: participant.current_puzzle + 1,
    }
  })

  res.status(200).json({ isAnswerCorrect: true });
}

