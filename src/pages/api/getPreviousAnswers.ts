import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"
import { puzzleAnswers } from "../../globals/puzzleAnswers"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

  if (!session) {
    res.status(404).json({message: "User is not logged in."});
    return;
  }

  const prisma = new PrismaClient();
  const participant = await prisma.participantStatus.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!participant) {
    res.status(404).json({message: "User is not registered."});
    return;
  }

  if (participant.current_puzzle == 1) {
    res.status(200).json({answers: []});
    return;
  }

  res.status(200).json({answers: puzzleAnswers.slice(0, participant.current_puzzle-1)})
  return;
}
