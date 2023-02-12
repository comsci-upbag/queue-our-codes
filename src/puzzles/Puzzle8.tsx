import Dialogue from "@/components/Dialogue";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle8({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <Dialogue sender="Mr. Cat" senderImage="/logo.svg" isFinished={currentPuzzle !== puzzleId} script={[
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

      <Dialogue sender="Mr. Cat" senderImage="/logo.svg" isFinished={currentPuzzle !== puzzleId} script={[
        { type: "send", message: "Quite intriguing indeed, don’t you think? meow This fur, it is unmistakable. It belongs to Gray." },
        { type: "reply", message: "Oh, thanks! Didn’t think you’d go out of your way to help me." },
        { type: "send", message: "Do not think of yourself so highly, two-legged one. meow I simply wanted to see the sight for myself! One would never feel pity as to go out of my way to provide personal assistance. meow" },
        { type: "reply", message: "Alright, alright, thanks for the help, your greatness!" },
        { type: "send", message: "I did not do it to be thanked." }
        ]}
      />
    </>
  )
}
