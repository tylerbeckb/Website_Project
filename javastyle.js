// For quiz page
function quiz() {

  var progressWidth = -20;
  // Array containing all questions
  const questionText = [
    {
      question: "What is Reforestation?",
      // Array containing all answerd
      answers: [
        { p: "Act of replanting trees", correctAns: true },
        { p: "Act of cutting down trees", correctAns: false },
        { p: "Watering trees", correctAns: false },
        { p: "Hugging Trees", correctAns: false },
      ]
    },
    {
      question: "What does not help stopping deforestation?",
      answers: [
        { p: "Donating to charities", correctAns: false},
        { p: "Recycle", correctAns: false},
        { p: "Buying palm oil", correctAns: true},
        { p: "Reduce meat intake", correctAns: false},
      ]
    },
    {
      question: "What percentage of global deforestation is animal grazing responsible for?",
      answers: [
        { p: "18%", correctAns: false},
        { p: "50%", correctAns: false},
        { p: "2%", correctAns: false},
        { p: "14%", correctAns: true},
      ]
    },
    {
      question: "How many seagrass was restored by the WWF in the UK?",
      answers: [
        { p: "10 million", correctAns: false},
        { p: "1 million", correctAns: false},
        { p: "1.2 million", correctAns: true},
        { p: "2 million", correctAns: false},
      ]
    },
    {
      question: "How many acres of rainforests has Rainforest Trust protected?",
      answers: [
        { p: "40 million", correctAns: true},
        { p: "10 million", correctAns: false},
        { p: "100 million", correctAns: false},
        { p: "50 million", correctAns: false},
      ]
    }
  ]

  // Hides score and questions
  $(document).ready(function(){
    $("#question_area").hide();
    $("#score_card").hide();
    $("#form").hide();
    $("#leaderboard").hide();
    $(".progress-bar").css("width", progressWidth + "%");
  });
  // Creates variables
  const startBtn = document.getElementById("start");
  const questionId = document.getElementById("question");
  const answers = document.getElementById("answers");
  var index;
  var score;

  startBtn.addEventListener("click", startFunc);

  // Starts the quiz
  function startFunc() {
    // Displays questions and hides start button
    $(document).ready(function() {
      $("#start").hide();
      $("#question_area").show();
      $("#score_card").hide();
      $("#leaderboard").hide();
    });
    progressWidth = -20;
    index = 0;
    score = 0;
    nextQuestion();
  }

  // Checks if new questions to be displayed
  function nextQuestion () {
    progressWidth += 20;
    $(".progress-bar").css("width", progressWidth+ "%");
    $(".progress-bar").text(progressWidth + "%");
    // Removes previous answers
    while (answers.firstChild) {
      answers.removeChild(answers.firstChild);
    }
    // Checks if there are questions left
    if (index < questionText.length) {
      displayQuiz(questionText[index]);
    }
    else {
      scoreCard();
    }
  }

  // Displays new questions and answers
  function displayQuiz(questionText) {
    // Displays question
    questionId.innerHTML = questionText.question;
    // Iterate through every answer
    questionText.answers.forEach(ans => {
      // Creates new button
      const newBtn = document.createElement("button");
      newBtn.innerText = ans.p;
      newBtn.classList.add("btn");
      // Adds the boolean if answer if correct
      if (ans.correctAns) {
        newBtn.dataset.correctAns = ans.correctAns;
      }
      newBtn.addEventListener("click", () => {
        ++index
        if (newBtn.dataset.correctAns) {
          ++score;
        }
        else {
        }
        nextQuestion();
      })
      answers.appendChild(newBtn);
    });
  }

  // Displays final score 
  function scoreCard() {
    $(document).ready(function() {
      $("#form").show();
      $("#submit").click(function(){
        leaderboard();
      });
      $("#question_area").hide();
      $("#score_card").show();
      $("#score_card").text("Score = " + score);
    });
  };

  // Displays and updates leaderboard
  function leaderboard() { 
    $(document).ready(function() {
      // Shows or hides objects
      $("#start").show();
      $("#start").text("Play Again");
      $("#form").hide();
      $("#score_card").hide();
      $("#leaderboard").show();

      if (typeof(Storage) !== "undefined") {
        if (localStorage.oneValue && localStorage.oneName) {
          $("#1").text(localStorage.oneName + " - " + localStorage.oneValue);
        }
        else {
          localStorage.oneValue = 5;
          localStorage.oneName = "Weldon Truman";
        }
      }
      // Gets values from form
      var input = document.getElementById("form");
      var firstName = input.elements[0].value;
      var lastName = input.elements[1].value;
      // Checks if user should be on the leaderboard
      if (parseInt(localStorage.oneValue) < score) {
        // Updates leaderboard
        if (typeof(Storage) !== "undefined") {
          if (localStorage.oneValue) {
            localStorage.oneValue = score;
          }
          else {
            localStorage.oneValue = 5;
          }
          if (localStorage.oneName) {
            localStorage.oneName = firstName + " " + lastName;
          }
          else {
            localStorage.oneName = "Weldon Truman";
          }
        }
        $("#1").text(localStorage.oneName + " - " + localStorage.oneValue);
      }
      else if(parseInt(document.getElementById("2").getAttribute("value")) <= score) {
        $("#2").text(firstName + " " + lastName + " - " + score);
        $("#2").value = score;
      }
      else if(parseInt(document.getElementById("3").getAttribute("value")) <= score) {
        $("#3").text(firstName + " " + lastName + " - " + score);
        $("#3").value = score;
      }
    });
  }
};

function loadFade() {
  $(document).ready(function() {
    // Fades in the title and navbar
    $(".title").hide();
    $(".title").fadeIn(2000);
    $(".navigation").hide();
    $(".navigation").delay(1000).fadeIn(2000);
    // Fades elements in when scrolling
    $(window).scroll(function() {
      $(".fade").each(function() {
        // Calculates postion
        var bot_element = $(this).offset().top ;
        var bot_window = $(window).scrollTop() + $(window).height();
        if( bot_window > bot_element ) {
          // Checks what animation to use
          if($(this).attr("id") == "fadeRight") {
            $(this).addClass("fadeShowRight");
          }
          else if($(this).attr("id") == "fadeLeft") {
            $(this).addClass("fadeShowLeft");
          }
          else {
            $(this).addClass("fadeShow");
          }
        }
      });
    });
  });
};

// Displays location
function geolocation() {
  // Checks if geolocation is supported
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    document.getElementById("location") = "Geolocation is not supported";
  }

  // Displays the coordinates
  function showPosition(position) {
    // Displays coordinates only if user is in the uk
    if (position.coords.latitude >= 49 && position.coords.latitude <= 59 
      && position.coords.longitude <= 2 && position.coords.longitude >= -8) {
      document.getElementById("location").innerHTML = "<p>Latitude: " + position.coords.latitude + "</p>" +
        "<p>Longitude: " + position.coords.longitude + "</p>";
      }; 
  };
};