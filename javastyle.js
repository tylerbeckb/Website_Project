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
      newBtn.classList.add("quiz_btn");
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

      // Checks if browser can use local storage
      if (typeof(Storage) !== "undefined") {
        // Resests data is they aren't defined
        if (localStorage.oneValue && localStorage.oneName) {
          $("#1").text(localStorage.oneName + " - " + localStorage.oneValue);
        }
        else {
          localStorage.oneValue = 5;
          localStorage.oneName = "Weldon Truman";
        }
        if (localStorage.twoValue && localStorage.twoName) {
          $("#2").text(localStorage.twoName + " - " + localStorage.twoValue);
        }
        else {
          localStorage.twoValue = 4;
          localStorage.twoName = "Prosper Winston";
        }
        if (localStorage.threeValue && localStorage.threeName) {
          $("#3").text(localStorage.threeName + " - " + localStorage.threeValue);
        }
        else {
          localStorage.threeValue = 3;
          localStorage.threeName = "Darion Earl";
        }
      }
      // Error message
      else {
        $("#leaderboard").text("local storage not available");
        return;
      }
      // Gets values from form
      var input = document.getElementById("form");
      var firstName = input.elements[0].value;
      var lastName = input.elements[1].value;
      // Checks if user should be on the leaderboard
      if (parseInt(localStorage.oneValue) <= score) {
        // Updates leaderboard
        localStorage.oneValue = score;
        localStorage.oneName = firstName + " " + lastName;
        $("#1").text(localStorage.oneName + " - " + localStorage.oneValue);
        return;
      }
      else if(parseInt(localStorage.twoValue) <= score) {
        localStorage.twoValue = score;
        localStorage.twoName = firstName + " " + lastName;
        $("#2").text(localStorage.twoName + " - " + localStorage.twoValue);
        return;
      }
      else if(parseInt(localStorage.threeValue) <= score) {
        localStorage.threeValue = score;
        localStorage.threeName = firstName + " " + lastName;
        $("#3").text(localStorage.threeName + " - " + localStorage.threeValue);
        return;
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
    navigator.geolocation.getCurrentPosition(getNearest);
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
        var distance1 = getDistance(position.coords.latitude, position.coords.longitude, -3.4653, -62.2159);
        alert(distance1);
      }; 
  };
};

// Calculates distance between 2 points
function getDistance(lat1, lon1, lat2, lon2) {
  var radianLat1 = radians(lat1);
  var radianLat2 = radians(lat2);
  var longDiff = lon1 - lon2;
  var radianlongDiff = radians(longDiff)
  var distance = Math.sin(radianLat1) * Math.sin(radianLat2) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.cos(radianlongDiff);
  distance = Math.acos(distance);
  distance = distance * 180/Math.PI;
  distance = distance * 60 * 1.1515 * 1.609344;
  return distance;
}

function radians(value) {
  return Math.PI * (value/180)
}

function getNearest(position) {
  var distance1 = getDistance(position.coords.latitude, position.coords.longitude, -3.4653, -62.2159);
  var distance2 = getDistance(position.coords.latitude, position.coords.longitude, -5.9175, 12.5484);
  var distance3 = getDistance(position.coords.latitude, position.coords.longitude, -1.75, 102.75);

  if (distance1 > distance2 && distance1 > distance3) {
    $("#amazon").slideDown();
  }
  else if (distance2 > distance1 && distance2 > distance3) {
    $("#congo").slideDown();
  }
  else {
    $("#indo").slideDown();
    displayCircle();
  }
}

function slide() {
  $(document).ready(function(){
    $("#indo").slideUp();
    $("#amazon").slideUp();
    $("#congo").slideUp();
  })
}

function slideAll() {
  $(document).ready(function(){
    $("#indo").slideDown();
    $("#amazon").slideDown();
    $("#congo").slideDown();
    displayCircle("red");
  })
}

// Draws circle on canvas
function displayCircle(color) {
  var c = document.getElementById("circle_info");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(150, 75, 70, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// Display orangutan facts
function displayOrang() {
  var c = document.getElementById("circle_info");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.font = "13px serif"
  ctx.fillStyle = "black";
  ctx.fillText ("Critically Endangered", 95, 50);
  ctx.fillText ("Sumatran orangutans", 95, 70);
  ctx.fillText ("only 14,000 left", 95, 85);
  ctx.fillText ("Bornean orangutans", 95, 105);
  ctx.fillText ("only 105,000 left", 100, 120);
}