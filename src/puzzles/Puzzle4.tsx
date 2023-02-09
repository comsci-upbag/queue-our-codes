import QRCode from "@/components/QRCode"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle4(_ : Props) {

  const validateQrCode = async (decodedText: string) => {
    if (!decodedText)
      return;

    const result = await fetch("api/validateQRCode", {
      method: 'POST',
      body: JSON.stringify({ decodedText })
    });

    const isAnswerCorrect = (await result.json()).isAnswerCorrect;

    if (!isAnswerCorrect)
      console.error("Wrong qrcode");
  }

  return <QRCode onResultCallback={validateQrCode} buttonLabel="Start Looking"/>
}
