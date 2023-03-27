const questionText = [
  {
    question: "What is 2+2",
    answers: [
      { p: "4", correctAns: true },
      { p: "22", correctAns: false },
    ]
  },
  {
    question: "What is 3+3",
    answers: [
      { p: "9", correctAns: true},
      { p: "12", correctAns: false},
      { p: "13", correctAns: false},
      { p: "14", correctAns: false},
    ]
  }
]

const startBtn = document.getElementById("start")
const questionArea = document.getElementById("question_area")
const questionId = document.getElementById("question")
const answers = document.getElementById("answers")
const scoreElement = document.getElementById("score_card")
var index;
var score;

startBtn.addEventListener("click", startFunc)

function startFunc() {
  startBtn.classList.add("hide")
  questionArea.classList.remove("hide")
  scoreElement.classList.add("hide")
  index = 0;
  score = 0;
  nextQuestion()
}

function nextQuestion () {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }
  if (index < questionText.length) {
    displayQuiz(questionText[index])
  }
  else {
    scoreCard()
  }
}

function displayQuiz(questionText) {
  questionId.innerHTML = questionText.question
  questionText.answers.forEach(ans => {
    const newBtn = document.createElement("button")
    newBtn.innerText = ans.p
    newBtn.classList.add("btn")
    if (ans.correctAns) {
      newBtn.dataset.correctAns = ans.correctAns
    }
    newBtn.addEventListener("click", () => {
      ++index
      if (newBtn.dataset.correctAns) {
        ++score
      }
      nextQuestion()
    })
    answers.appendChild(newBtn)
  });
}

function scoreCard() {
  startBtn.classList.remove("hide")
  questionArea.classList.add("hide")
  scoreElement.classList.remove("hide")
  scoreElement.innerHTML = "Score = " + score
}

