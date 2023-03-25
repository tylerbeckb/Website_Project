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
    document.getElementById("questions").innerHTML = "";
    var question = Object.keys(questionArray)[index];
    document.getElementById("questions").innerHTML = question; 
  };

  // Function displays all answers
  function displayAnswer(index) {
    var answersArray = questionArray[Object.keys(questionArray)[index]];
    document.getElementById("a1").innerHTML = "";
    document.getElementById("a2").innerHTML = "";
    document.getElementById("a3").innerHTML = "";
    document.getElementById("a1").innerHTML = answersArray[0];
    document.getElementById("a2").innerHTML = answersArray[1];
    document.getElementById("a3").innerHTML = answersArray[2];
  };
  displayQuestion(index);
  displayAnswer(index);
}