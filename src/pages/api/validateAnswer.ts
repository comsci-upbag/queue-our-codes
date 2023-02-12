import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"
import { isAnswerCorrect } from "../../globals/answers";
import { prisma } from "@/globals/prisma"


interface PuzzleAnswer {
  puzzleId: number,
  answer: string,
}

const context = new Map([
  [1, false],
  [2, true],
  [3, true],
  [4, true],
  [5, true],
  [6, true],
  [7, true],
  [8, true],
  [9, true],
  [10, true],
])

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

