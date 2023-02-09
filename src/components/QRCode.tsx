import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import ConditionalShow from "@/components/ConditionalShow"
import styles from "@/styles/QRCode.module.css"

interface Props {
  onResultCallback: (decodedText: string) => Promise<void>,
}

export default function QRCode({ onResultCallback } : Props) {

  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  return (
    <div className={styles.QRCodeContainer}>

      <ConditionalShow shouldShow={isCameraEnabled} >
        <QrScanner onResult={async (data) => { await onResultCallback(data.getText()) }} 
                   onError={(err) => { console.log(err) }} />
      </ConditionalShow>

      <button className={styles.EnableButton} onClick={() => setIsCameraEnabled(true)}/>
    </div>
  )


}
