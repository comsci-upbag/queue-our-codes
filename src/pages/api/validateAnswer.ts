
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'


// TODO: add answers
const answers = [
  "TEST",
]


interface PuzzleAnswer {
  puzzleId: number,
  answer: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { puzzleId, answer } = JSON.parse(req.body) as PuzzleAnswer;

  if (answers[puzzleId - 1] == answer) {
    // update database
    res.status(200).json({message: "Correct Answer!"});
  }

}

