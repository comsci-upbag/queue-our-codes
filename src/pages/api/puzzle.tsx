

import Puzzle1 from "@/puzzles/Puzzle1";
import Puzzle2 from "@/puzzles/Puzzle2";
import Puzzle3 from "@/puzzles/Puzzle3";
import Puzzle4 from "@/puzzles/Puzzle4";
import Puzzle5 from "@/puzzles/Puzzle5";
import Puzzle6 from "@/puzzles/Puzzle6";
import Puzzle7 from "@/puzzles/Puzzle7";
import Puzzle8 from "@/puzzles/Puzzle8";
import Puzzle9 from "@/puzzles/Puzzle9";
import Puzzle10 from "@/puzzles/Puzzle10";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

function Puzzle({ puzzleId, currentPuzzle }: Props) {


  if (puzzleId == 1)
    return <Puzzle1 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 2)
    return <Puzzle2 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 3)
    return <Puzzle3 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 4)
    return <Puzzle4 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 5)
    return <Puzzle5 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 6)
    return <Puzzle6 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 7)
    return <Puzzle7 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 8)
    return <Puzzle8 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 9)
    return <Puzzle9 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  if (puzzleId == 10)
    return <Puzzle10 puzzleId={puzzleId} currentPuzzle={currentPuzzle} />

  return <></>

}

export default Puzzle;
