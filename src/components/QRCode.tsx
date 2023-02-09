import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Show from "@/components/Show"
import styles from "@/styles/QRCode.module.css"

interface Props {
  onResultCallback: (decodedText: string) => Promise<void>,
  buttonLabel: string,
}

export default function QRCode({ buttonLabel, onResultCallback }: Props) {

  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  return (
    <div className={styles.QRCodeContainer}>

      <Show when={isCameraEnabled} >
        <QrScanner onResult={async (data) => { await onResultCallback(data.getText()) }}
          onError={(err) => { console.log(err) }} />
      </Show>

      <Show when={!isCameraEnabled}>
        <button className={styles.EnableButton} onClick={() => setIsCameraEnabled(!isCameraEnabled)}> {buttonLabel}  </button>
      </Show>
    </div>
  )


}
