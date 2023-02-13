

export const textAnswers = [
  { number: 1, answer: "MCAT" },
  { number: 2, answer: "BLACKCAT" },
  { number: 3, answer: "IFUGAOHOUSE" },
  { number: 4, answer: "MUMSHIE" },
  { number: 5, answer: "13" },
  { number: 6, answer: "BUTTERNUT" },
  { number: 7, answer: "SIKE" },
  { number: 8, answer: "" },
  { number: 9, answer: "VIGNERECIPHER" },
  { number: 9, answer: "" },
]


const imageAnswers = [
  { number: 1, answer: "white-cat-yellow-head" },
  { number: 2, answer: "" },
  { number: 3, answer: "" },
  { number: 4, answer: "" },
  { number: 5, answer: "" },
  { number: 6, answer: "" },
  { number: 7, answer: "" },
  { number: 8, answer: "" },
  { number: 9, answer: "" },
  { number: 10, answer: "" },
]

const qrcodeAnswers = [
  { number: 1, answer: "" },
  { number: 2, answer: "" },
  { number: 3, answer: "" },
  { number: 4, answer: "" },
  { number: 5, answer: "" },
  { number: 6, answer: "" },
  { number: 7, answer: "" },
  { number: 8, answer: "6dbAv@d%3TsqG^&aL#DS^&&XN#3&6zB#" },
  { number: 9, answer: "" },
  { number: 10, answer: "" },
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
    return correctAnswer.toLowerCase() === answer.toLowerCase();
  }

  return false;
}
