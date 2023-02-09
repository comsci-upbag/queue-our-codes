

import Puzzle1 from "@/puzzles/Puzzle1";
import Puzzle2 from "@/puzzles/Puzzle2";
import Puzzle3 from "@/puzzles/Puzzle3";
import Puzzle4 from "@/puzzles/Puzzle4";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

function Puzzle({ puzzleId, currentPuzzle }: Props) {


  if (puzzleId == 1)
    return <Puzzle1 puzzleId={puzzleId} currentPuzzle={currentPuzzle}/>

  if (puzzleId == 2)
    return <Puzzle2 puzzleId={puzzleId} currentPuzzle={currentPuzzle}/>
  
  if (puzzleId == 3)
    return <Puzzle3 puzzleId={puzzleId} currentPuzzle={currentPuzzle}/>

  if (puzzleId == 4)
    return <Puzzle4 puzzleId={puzzleId} currentPuzzle={currentPuzzle}/>

  return <></>

}

export default Puzzle;
