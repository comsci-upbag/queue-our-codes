import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"
import { isAnswerCorrect } from "../../globals/answers";
import { prisma } from "@/globals/prisma"


interface PuzzleAnswer {
  puzzleId: number,
  answer: string,
}

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
  const currentTime = new Date(Date.now());
  const FIVE_MINS_IN_MS = 300_000

  if (puzzleId === 4 && participant.lastSubmitted) {
    const elapsedTimeSinceLastSubmit = currentTime.getTime() - participant.lastSubmitted.getTime()

    if (elapsedTimeSinceLastSubmit < FIVE_MINS_IN_MS) {
      res.status(200).json({ isAnswerCorrect: false, timeUntilCanSubmit: FIVE_MINS_IN_MS - elapsedTimeSinceLastSubmit })
      return;
    }

    await prisma.participantStatus.update({
      where: {
        email: session.user.email,
      },
      data: {
        tries: 0,
        lastSubmitted: null
      }
    })
    res.status(200).json({ isAnswerCorrect: false, timeUntilCanSubmit: null, triesLeft: 3 })
    return;
  }

  if (puzzleId === 4 && participant.tries === 3 && participant.lastSubmitted === null) {
    await prisma.participantStatus.update({
      where: {
        email: session.user.email,
      },
      data: {
        tries: 0,
        lastSubmitted: currentTime
      }
    })

    res.status(200).json({ isAnswerCorrect: false, triesLeft: 0, timeUntilCanSubmit: FIVE_MINS_IN_MS })
    return;
  }

  if (puzzleId === 5 && participant.tries === 2) {
    await prisma.participantStatus.update({
      where: {
        email: session.user.email,
      },
      data: {
        current_puzzle: 1,
        tries: 0,
      }
    })
    res.status(200).json({ isAnswerCorrect: false, triesLeft: 0, shouldReload: true });
    return;
  }

  if (!isAnswerCorrect("text", puzzleId, answer)) {
    await prisma.participantStatus.update({
      where: {
        id: participant.id
      },
      data: {
        tries: participant.tries + 1 < 3 ? participant.tries + 1 : 3
      }
    })
    res.status(200).json({ isAnswerCorrect: false, triesLeft: 2 - participant.tries });
    return;
  }

  // update participant data
  await prisma.participantStatus.update({
    where: {
      email: session.user.email,
    },
    data: {
      current_puzzle: participant.current_puzzle + 1,
      tries: 0,
      lastSubmitted: null
    }
  })

  res.status(200).json({ isAnswerCorrect: true });
}

