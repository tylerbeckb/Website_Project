// Array containing all questions
const questionText = [
  {
    question: "What is 2+2",
    // Array containing all answerd
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

// Creates variables
const startBtn = document.getElementById("start")
const questionArea = document.getElementById("question_area")
const questionId = document.getElementById("question")
const answers = document.getElementById("answers")
const scoreElement = document.getElementById("score_card")
var index;
var score;

startBtn.addEventListener("click", startFunc)

// Starts the quiz
function startFunc() {
  startBtn.classList.add("hide")
  questionArea.classList.remove("hide")
  scoreElement.classList.add("hide")
  index = 0;
  score = 0;
  nextQuestion()
}

// Checks if new questions to be displayed
function nextQuestion () {
  // Removes previous answers
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }
  // Checks if there are questions left
  if (index < questionText.length) {
    displayQuiz(questionText[index])
  }
  else {
    scoreCard()
  }
}

// Displays new questions and answers
function displayQuiz(questionText) {
  // Displays question
  questionId.innerHTML = questionText.question
  // Iterate through every answer
  questionText.answers.forEach(ans => {
    // Creates new button
    const newBtn = document.createElement("button")
    newBtn.innerText = ans.p
    newBtn.classList.add("btn")
    // Adds the boolean if answer if correct
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

// Displays final score 
function scoreCard() {
  startBtn.classList.remove("hide")
  startBtn.innerHTML = "Play Again"
  questionArea.classList.add("hide")
  scoreElement.classList.remove("hide")
  scoreElement.innerHTML = "Score = " + score
}

