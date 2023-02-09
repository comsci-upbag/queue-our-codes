import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import ConditionalShow from "@/components/ConditionalShow"
import styles from "@/styles/QRCode.module.css"

interface Props {
  onResultCallback: (decodedText: string) => Promise<Response>,
  buttonLabel: string,
}

export default function QRCode({ buttonLabel, onResultCallback }: Props) {

  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  return (
    <div className={styles.QRCodeContainer}>

      <ConditionalShow shouldShow={isCameraEnabled} >
        <QrScanner onResult={async (data) => { await onResultCallback(data.getText()) }}
          onError={(err) => { console.log(err) }} />
      </ConditionalShow>

      {!isCameraEnabled && <button className={styles.EnableButton} onClick={() => setIsCameraEnabled(!isCameraEnabled)}> {buttonLabel}  </button>}
    </div>
  )


}
