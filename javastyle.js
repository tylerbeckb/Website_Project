// Executes code when window is loaded
window.onload = function () {
  // Contains questions and answers
  var questionArray = {
    "What is Reforestation?" : ["Act of destroying trees", "Act of replanting trees", "Protest for change"],
    "What is not a way to help reduce deforestation?" : ["Watching TV", "Recycling", "Education"],
  };
  // Stores indexes of correct answers
  var correctAnswer = [1,0];
  var index = 0;

  // Function displays the questions
  function displayQuestion(index) {
    var question = Object.keys(questionArray)[index];
    document.getElementById("questions").innerHTML = question; 
  }
  displayQuestion(index)
}