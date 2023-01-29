
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

import { getSession } from "next-auth/react"
import { puzzleAnswers } from "../../globals/puzzleAnswers";


interface PuzzleAnswer {
  puzzleId: number,
  answer: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { puzzleId, answer } = JSON.parse(req.body) as PuzzleAnswer;

  if (puzzleAnswers[puzzleId - 1] != answer) {
    res.status(200).json({isAnswerCorrect: false});
    return;
  }

  const session = await getSession({ req });


  if (!session) {
    res.status(404).json({ messages: "No logged in account." });
    return;
  }

  const prisma = new PrismaClient();
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

