const questionText = [
  {
    question: "What is 2+2",
    answers: [
      { p: "4", correctAns: true },
      { p: "22", correctAns: false },
    ]
  }
]

const startBtn = document.getElementById("start")
const questionArea = document.getElementById("question_area")
const questionId = document.getElementById("question")
const answers = document.getElementById("answers")
var index;

startBtn.addEventListener("click", startFunc)

function startFunc() {
  startBtn.classList.add("hide")
  questionArea.classList.remove("hide")
  index = 0;
  nextQuestion()
}

function nextQuestion () {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }
  displayQuiz(questionText[index])
}

function displayQuiz(questionText) {
  questionId.innerHTML = questionText.question
  questionText.answers.forEach(ans => {
    const newBtn = document.createElement("button")
    newBtn.innerText = ans.p
    newBtn.classList.add("btn")
    answers.appendChild(newBtn)
  });

}

