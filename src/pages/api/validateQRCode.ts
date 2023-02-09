import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"

import { isAnswerCorrect } from "@/globals/answers"
import { prisma } from "@/globals/prisma"


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

  const { decodedText } = JSON.parse(req.body) as { decodedText: string };

  if (!isAnswerCorrect("qrcode", participant!.current_puzzle, decodedText)) {
    res.status(200).json({ isAnswerCorrect: false });
    return;
  }

  res.status(200).json({ isAnswerCorrect: true });
}
