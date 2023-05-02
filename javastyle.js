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

// Calculates closest of 3 rainforests and displays that informaion
function getNearest(position) {
  // Works out the distances
  var distance1 = getDistance(position.coords.latitude, position.coords.longitude, -3.4653, -62.2159);
  var distance2 = getDistance(position.coords.latitude, position.coords.longitude, -5.9175, 12.5484);
  var distance3 = getDistance(position.coords.latitude, position.coords.longitude, -1.75, 102.75);

  // Sees what one is closer
  if (distance1 > distance2 && distance1 > distance3) {
    $("#amazon").slideDown();
    $("#jag").hover(function(){
      $("#sloth_info").hide();
      $("#jag_info").show();
      $("#jag_info").addClass("fadeShowLeft");
    });
    $("#sloth").hover(function(){
      $("#jag_info").hide();
      $("#sloth_info").show();
      $("#sloth_info").addClass("fadeShowLeft");
    });
  }
  else if (distance2 > distance1 && distance2 > distance3) {
    $("#congo").slideDown();
    $(".reveal_oval").click(function(){
      $(".reveal_oval").text("50% has been allocated for logging");
      $(".reveal_oval").addClass("oval_transition");
    });
    $(".reveal_para").click(function(){
      $(".reveal_para").text("Only place which has all subspecies of gorillas");
      $(".reveal_para").addClass("para_transition");
    });
    $(".reveal_rec").click(function(){
      $(".reveal_rec").text("Many parts has not been seen by people");
      $(".reveal_rec").addClass("rec_transition");
    });
  }
  else {
    $("#indo").slideDown();
    // Displays circle for orang on hover
    $("#orang").hover(function(){
      displayCircle("red"); displayOrang(); }
      ,function(){displayCircle("black")
    });
    // Displays circle for elephant on hover
    $("#ele").hover(function(){
      displayCircle("red"); displayEle(); }
      ,function(){ displayCircle("black");
    });
    // Displays circle for rhino on hover
    $("#rhino").hover(function(){
      displayCircle("red"); displayRhino(); }
      ,function(){ displayCircle("black");
    });
  }
}

// Resets page on load
function slide() {
  $(document).ready(function(){
    $("#indo").slideUp();
    $("#amazon").slideUp();
    $("#congo").slideUp();
    $("#jag_info").hide();
  });
}

// Displays all information
function slideAll() {
  $(document).ready(function(){
    $("#indo").slideDown();
    $("#amazon").slideDown();
    $("#congo").slideDown();
    // Displays circle for orang on hover
    $("#orang").hover(function(){
      displayCircle("red"); displayOrang(); }
      ,function(){ displayCircle("black");
    });
    // Displays circle for elephant on hover
    $("#ele").hover(function(){
      displayCircle("red"); displayEle(); }
      ,function(){ displayCircle("black");
    });
    // Displays circle for rhino on hover
    $("#rhino").hover(function(){
      displayCircle("red"); displayRhino(); }
      ,function(){ displayCircle("black");
    });
    // Displays circle for jag on hover
    $("#jag").hover(function(){
      $("#sloth_info").hide();
      $("#jag_info").show();
      $("#jag_info").addClass("fadeShowLeft");
    });
    // Displays circle for sloth on hover
    $("#sloth").hover(function(){
      $("#jag_info").hide();
      $("#sloth_info").show();
      $("#sloth_info").addClass("fadeShowLeft");
    });
    // Displays facts when clicked for each shape
    $(".reveal_oval").click(function(){
      $(".reveal_oval").text("50% has been allocated for logging");
      $(".reveal_oval").addClass("oval_transition");
    });
    $(".reveal_para").click(function(){
      $(".reveal_para").text("Only place which has all subspecies of gorillas");
      $(".reveal_para").addClass("para_transition");
    });
    $(".reveal_rec").click(function(){
      $(".reveal_rec").text("Many parts has not been seen by people");
      $(".reveal_rec").addClass("rec_transition");
    });
  });
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

// Displays elephant facts
function displayEle() {
  var c = document.getElementById("circle_info");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.font = "13px serif"
  ctx.fillStyle = "black";
  ctx.fillText ("Critically Endangered", 95, 50);
  ctx.fillText ("Sumatran elephants", 95, 70);
  ctx.fillText ("only 2,800 left", 95, 85);
  ctx.fillText ("Bornean elephants", 95, 105);
  ctx.fillText ("only 1,500 left", 100, 120);
}

// Displays rhino facts
function displayRhino() {
  var c = document.getElementById("circle_info");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.font = "13px serif"
  ctx.fillStyle = "black";
  ctx.fillText ("Critically Endangered", 95, 50);
  ctx.fillText ("Sumatran rhino", 95, 70);
  ctx.fillText ("only 80 left", 95, 85);
}

// Used in fundraise page
function fundraise() {
  var imgIndex = 1;
  $(document).ready(function(){
    // Sets page to default
    $("#slide1").fadeIn();
    $("#info2").hide();
    $("#info3").hide();
    $("#fund_list1_info").toggle();
    $("#fund_list2_info").toggle();
    $("#fund_list3_info").toggle();
    $("#fund_list4_info").toggle();
    // Checks for clikcs on the lists
    $("#fund_list1").click(function(){
      $("#fund_list1_info").toggle();
    });
    $("#fund_list2").click(function(){
      $("#fund_list2_info").toggle();
    });
    $("#fund_list3").click(function(){
      $("#fund_list3_info").toggle();
    });
    $("#fund_list4").click(function(){
      $("#fund_list4_info").toggle();
    });
    // Checks for clicks for the slideshow
    $(".slide_left").click(function(){
      changeSlide(-1);
    });
    $(".slide_right").click(function(){
      changeSlide(1);
    });

    function changeSlide (indexChange) {
      imgIndex += indexChange;
      if (imgIndex == 1 || imgIndex > 3) {
        imgIndex = 1;
        $("#slide1").fadeIn();
        $("#slide2").hide();
        $("#slide3").hide();
        $("#info1").show();
        $("#info2").hide();
        $("#info3").hide();
      }
      if (imgIndex == 2) {
        $("#slide1").hide();
        $("#slide2").fadeIn();
        $("#slide3").hide();
        $("#info1").hide();
        $("#info2").show();
        $("#info3").hide();
      }
      if (imgIndex == 3 || imgIndex < 1) {
        imgIndex = 3;
        $("#slide1").hide();
        $("#slide2").hide();
        $("#slide3").fadeIn();
        $("#info1").hide();
        $("#info2").hide();
        $("#info3").show();
      }
    }
  });
}

// Used in extinction page
function extinction() {
  $(document).ready(function(){
    // Hides all info
    $("#tiger_info_overlay").hide();
    $("#otter_info_overlay").hide();
    $("#frog_info_overlay").hide();
    $("#tapir_info_overlay").hide();
    $(".title").hide();
    // Fades in info on hover for tiger
    $("#tiger_card").hover(function(){
      $("#tiger_info_overlay").fadeIn();
    }, function(){
      $("#tiger_info_overlay").fadeOut();
    });
    // Fades in info on hover for otter
    $("#otter_card").hover(function(){
      $("#otter_info_overlay").fadeIn();
    }, function(){
      $("#otter_info_overlay").fadeOut();
    });
    // Fades in info on hover for frog
    $("#frog_card").hover(function(){
      $("#frog_info_overlay").fadeIn();
    }, function(){
      $("#frog_info_overlay").fadeOut();
    });
    // Fades in info on hover for tapir
    $("#tapir_card").hover(function(){
      $("#tapir_info_overlay").fadeIn();
    }, function(){
      $("#tapir_info_overlay").fadeOut();
    });
    $(".extinct_learn_card").hover(function(){
      $("#help_title").fadeIn();
    }, function(){
      $("#help_title").fadeOut();
    });
    $(".extinct_charity_card").hover(function(){
      $("#char_title").fadeIn();
    }, function(){
      $("#char_title").fadeOut();
    });
  });
}

function pageChange () {
  window.location.replace("help.html");
}