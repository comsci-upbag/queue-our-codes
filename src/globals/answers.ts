

export const textAnswers = [
  { number: 1, answer: "TEST1" },
  { number: 2, answer: "TEST2" },
  { number: 3, answer: "TEST3" },
  { number: 4, answer: "TEST4" },
  { number: 5, answer: "TEST5" },
  { number: 6, answer: "TEST6" },
  { number: 7, answer: "TEST7" },
  { number: 8, answer: "TEST8" },
  { number: 9, answer: "TEST9" },
]


export const imageAnswers = [
  { number: 1, answer: "white-cat-yellow-head" },
  { number: 2, answer: "TEST2" },
  { number: 3, answer: "TEST3" },
  { number: 4, answer: "TEST4" },
  { number: 5, answer: "TEST5" },
  { number: 6, answer: "TEST6" },
  { number: 7, answer: "TEST7" },
  { number: 8, answer: "TEST8" },
  { number: 9, answer: "TEST9" },
]

export const qrcodeAnswers = [
  { number: 1, answer: "TEST1" },
  { number: 2, answer: "TEST2" },
  { number: 3, answer: "TEST3" },
  { number: 4, answer: "TEST4" },
  { number: 5, answer: "TEST5" },
  { number: 6, answer: "TEST6" },
  { number: 7, answer: "TEST7" },
  { number: 8, answer: "TEST8" },
  { number: 9, answer: "TEST9" },
]

export function isAnswerCorrect(type: "qrcode" | "image" | "text", puzzleId: number, answer: string): boolean {

  if (type == "qrcode") {
    const correctAnswer = qrcodeAnswers.filter(answer => answer.number == puzzleId)[0].answer;
    return correctAnswer === answer;
  }

  if (type == "image") {
    const correctAnswer = imageAnswers.filter(answer => answer.number == puzzleId)[0].answer;
    return correctAnswer === answer;
  }

  if (type == "text") {
    const correctAnswer = textAnswers.filter(answer => answer.number == puzzleId)[0].answer;
    return correctAnswer === answer;
  }

  return false;
}
