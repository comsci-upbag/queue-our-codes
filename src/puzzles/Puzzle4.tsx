
import { QrScanner } from "@yudiel/react-qr-scanner";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle4({ puzzleId, currentPuzzle }: Props) {


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

    // TODO: state handling here


  }

  return <QrScanner onResult={(data) => { validateQrCode(data.getText()) }} onError={(err) => { console.log(err) }} />

}
