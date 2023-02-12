import Dialogue from "@/components/Dialogue";
import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle4({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg"
          script={[
            { type: "send", message: "What’s the password? meow" },
            { type: "reply", message: "The password?" },
            { type: "send", message: "Do you not know what a password is? meow If you do not know the password, I cannot let you in." },
            { type: "reply", message: "I— I know! It’s…" },
          ]} />
      </div>
    </>
  )
}
