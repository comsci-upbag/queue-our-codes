import { useRef, useState } from "react";
import Image from "next/image";
import Show from "@/components/Show"

import styles from "@/styles/WebCam.module.css";

interface Props {
  buttonLabel: string,
  callback: (image: string) => void
}

export default function WebCam({ buttonLabel, callback }: Props) {
  const webcamContainer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [isCameraEnabled, setIsCameraEnabled] = useState<boolean>(false);

  async function enableCamera() {
    if (!(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))) {
      console.warn('getUserMedia() is not supported by your browser');
      return;
    }

    // getUsermedia parameters.
    const constraints = {
      video: { facingMode: "environment" },
      width: webcamContainer.current?.clientWidth,
      height: webcamContainer.current?.clientWidth,
    };

    // Activate the webcam stream.
    video.current!.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
    video.current!.load();
    await video.current!.play();
    video.current!.style.display = "block";

    setIsCameraEnabled(true);
  }

  function stopCurrentCamera() {
    if (video.current?.srcObject) {
      const stream = video.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      video.current.srcObject = null;
      video.current!.style.display = "none";

      setIsCameraEnabled(false);
    }
  }

  async function takePicture() {

    const getImageFromVideo = () => {
      let canvas = document.createElement('canvas');

      canvas.width = Math.max(video.current!.clientWidth, 384);
      canvas.height = Math.max(video.current!.clientWidth, 384);

      let ctx = canvas.getContext('2d');
      ctx?.drawImage(video.current!, 0, 0, canvas.width, canvas.height);

      let image = canvas.toDataURL('image/png');
      return image;
    }

    const image = getImageFromVideo();

    await callback(image);
  }

  return (
    <>
      <div ref={webcamContainer} className={styles.WebCamContainer}>
        <video ref={video} autoPlay playsInline muted width="100%" height="100%" style={{ display: "none" }} />

        <Show when={isCameraEnabled}>
          <div className={styles.CameraControls}>
            <button onClick={stopCurrentCamera}>
              <Image src="/stop-camera.svg" alt="stop camera" width={32} height={32} />
            </button>
            <button onClick={takePicture}>
              <Image src="/submit.svg" alt="submit picture" width={32} height={32} />
            </button>
          </div>
        </Show>

        <Show when={!isCameraEnabled}>
          <button className={styles.EnableButton} onClick={async () => {
            await enableCamera();
          }}>{buttonLabel}</button>
        </Show>

      </div>
    </>
  )
}
