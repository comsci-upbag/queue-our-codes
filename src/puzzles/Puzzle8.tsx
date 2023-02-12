import Dialogue from "@/components/Dialogue";
import Sequential from "@/components/Sequential"
import TextBlock from "@/components/TextBlock"
import WebCam from "@/components/WebCam";

import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle8({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Sequential>
          <Dialogue sender="Mr. Cat 2" senderImage="/logo.svg"
            script={[
              { type: "send", message: "Finally! Thank you for helping me out. Sike is the human slang that means something like “just kidding.” meow" },
              { type: "send", message: "Meowkay. Right, you needed information about something right? meow" },
              { type: "reply", message: "Yeah, I’m trying to find this chicken thief that is said to be a cat. Do you know anything about it?" },
              { type: "send", message: "I hate to break this to you after helping me and all but… SIKE! Haha! I really have no idea. meow I’ve been so busy that I didn’t notice anything at all! I’m not even Butternut! I’m Tonyo." },
              { type: "reply", message: "You wasted my time!" },
              { type: "send", message: "MEOW, WAIT! I do know someone who might help. meow I’ll call them for you. It’s my thanks for having you help me. meow" },
            ]} />
          
          <TextBlock type="narration" message="Out of nowhere, a cat appeared in front of you, laughing. "/>

          <Dialogue sender="Mr. Cat" senderImage="/logo.svg" script={[
            { type: "send", message: "Greetings! I see you have come searching for a butternut-furred cat. meow Perhaps one has come to pay respects to my greatness?" },
            { type: "reply", message: "Uh… I heard you knew something about a food-stealing cat”" },
            { type: "send", message: "Hmph! The audacity! meow One clearly doesn’t know proper decorum when speaking to one as great as moi! Although…" },
            { type: "reply", message: "Although?" },
            { type: "send", message: "One did notice quite a peculiar interaction one night around my humble abode. meow" },
            { type: "reply", message: "What is it?" },
            { type: "send", message: "Under the cover of night, meow one noticed an exchange betwixt two feline parties, and the silhouette of one such individual seemed to be carrying a chicken. meow" },
            { type: "reply", message: "Do you know who they were?" },
            { type: "send", message: "Not quite. meow Unfortunately, the cloak of darkness was able to delude even the keen eyes of one such as me. meow However, the location of the exchange is quite fresh in my mind." },
            { type: "reply", message: "Where was it?" },
            { type: "send", message: "In my humble abode, you may find the man cloaked in the emperor’s new clothes. meow The right hand of this emperor points to the whereabouts of the unusual interaction." },
            { type: "reply", message: "…what?" },
            { type: "send", message: "Hmph! One is finished speaking with you, if you wish to spend more time on idle chit-chat, I suggest you find those who were seen by the great Eve’s eyes. meow Be on your way now." }
          ]}
          />

          <TextBlock type="instruction" message="Uncover the secret of her greatness and discover the truth. Scan it using the camera. Make sure that the lighting is clear and that nothing is obstructing the view." />
          { /* TODO: ADD WHATEVER THE FUCK IS THIS */}
        </Sequential>
      </div>
    </>
  )
}
