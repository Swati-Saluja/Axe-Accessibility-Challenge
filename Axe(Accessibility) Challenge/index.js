/*$(function () {
$("main").on("mouseenter", function(){
    $(".intro").hide();//works with js pages show
  });*/
  $(function () {
  // Do stuff when doc loads.
  // Save the current state.
  var user = {
    "currentPage": 0,
    "answers": [],
    "correct": 0
  };
  // Questions and Answers
  var qa = [{
    "question": "What did the group of people make a toast to?",
    "answers": [{
      "answer": "A: Making Each Day Count",
      "correct": true
    }, {
      "answer": "B: Never Letting Go",
      "correct": false
    }, {
      "answer": "C: Live Your Life",
      "correct": false
    }, {
      "answer": "D: Jack and Rose Together Forever",
      "correct": false
    }]
  }, {
    "question": "Who is the director of the movie?",
    "answers": [{
      "answer": "A: Jimmy Dean",
      "correct": false
    }, {
      "answer": "B: Kenny Ortega",
      "correct": false
    }, {
      "answer": "C: James Cameron",
      "correct": true
    }, {
      "answer": "D: Steven Spielberg",
      "correct": false
    }]
  }, {
    "question": "How many years has it been since the Titanic sank in the movie?",
    "answers": [{
      "answer": "A: 95",
      "correct": false
    }, {
      "answer": "B: 74",
      "correct": false
    }, {
      "answer": "C: 3",
      "correct": false
    }, {
      "answer": "D: 84",
      "correct": true
    }]
  }, {
    "question": "The promise Rose had to make to Jack before Jack died was...",
    "answers": [{
      "answer": "A: \"I will never forget you\"",
      "correct": false
    }, {
      "answer": "B: \"I will never let go\"",
      "correct": true
    }, {
      "answer": "C: \"I will be here forever\"",
      "correct": false
    }, {
      "answer": "D: \"I will love you forever and always\"",
      "correct": false
    }]
  }, {
    "question": "How many people were saved from the water?",
    "answers": [{
      "answer": "A: 5",
      "correct": false
    }, {
      "answer": "B: 1",
      "correct": true
    }, {
      "answer": "C: 6",
      "correct": false
    }, {
      "answer": "D: 2200",
      "correct": false
    }]
  }, {
    "question": "How old was Rose when she was on the Titanic?",
    "answers": [{
      "answer": "A: 17",
      "correct": true
    }, {
      "answer": "B: 22",
      "correct": false
    }, {
      "answer": "C: 18",
      "correct": false
    }, {
      "answer": "D: 25",
      "correct": false
    }]
  }, {
    "question": "Who plays Jack Dawson?",
    "answers": [{
      "answer": "A: Brad Pitt",
      "correct": false
    }, {
      "answer": "B: Orlando Bloom",
      "correct": false
    }, {
      "answer": "C: Leonardo Di Caprio",
      "correct": true
    }, {
      "answer": "D: Jim Carrey",
      "correct": false
    }]
  }, {
    "question": "How did Rose and Jack meet on the Titanic?",
    "answers": [{
      "answer": "A: At a party",
      "correct": false
    }, {
      "answer": "B: When Rose was crying on a bench and Jack tried to comfort her",
      "correct": false
    }, {
      "answer": "C: When Jack asked to draw a picture of Rose",
      "correct": false
    }, {
      "answer": "D: When Jack saved Rose when she almost jumped off the ship",
      "correct": true
    }]
  }, {
    "question": "What was the name of the blue diamond necklace?",
    "answers": [{
      "answer": "A: True Blue",
      "correct": false
    }, {
      "answer": "B: The Heart of the Ocean",
      "correct": true
    }, {
      "answer": "C: Odyssey",
      "correct": false
    }, {
      "answer": "D: The Royal Heart",
      "correct": false
    }]
  }, {
    "question": "When did the sinking of the Titanic happen?",
    "answers": [{
      "answer": "A: April 19, 1913",
      "correct": false
    }, {
      "answer": "B: April 14, 1912",
      "correct": true
    }, {
      "answer": "C: May 6, 1942",
      "correct": false
    }, {
      "answer": "D: Feb 12, 1916",
      "correct": false
    }]
  }];
  

  // Stuff to do when you click on the start button.
  $(".next").click(function (e) {
    // Stop following the link.
    e.preventDefault();
    // Initialise the screens.
    user.currentPage++;
    // Update the background.
    $(".background").fadeOut(function () {
      $(this).removeClass("background-" + (user.currentPage-1)).addClass("background-" + user.currentPage).fadeIn();
    });
    // QAIndex
    var qaIndex = user.currentPage - 1;
    // If it is the intro page, then do:
    if (user.currentPage === 1) {
      if (qa.length > 0)
        // Fade out the intro div.
        $("#intro").fadeOut(function () {
          // Populate the questions and answers.
          populateCurrentQuestion();
          // Enable the buttons based on the situation.
          handlePrevNextEnablement();
          // Fade in the counte, progress bar and questions.
          $(".counter, .progress, #questions").hide().prop("hidden", false).fadeIn();
        });
      else
        $(this).text("No Questions!").addClass("disabled");
    } else if (user.currentPage > 1) {
      // Store the user's question and corresponding answer in user's entry.
      user.answers.push($(".answer:checked + label").text().trim());
      // Show the next question.
      if (qaIndex !== qa.length) {
        // Fadeout the current question page.
        $("#questions").fadeOut(function () {
          // Update the current questions values.
          populateCurrentQuestion();
          // Enable the buttons based on the situation.
          handlePrevNextEnablement();
          // Show the current question.
          $(this).fadeIn();
        });
      } else {
        // Full Bar.
        $(".bar").hide();

        //compile the right answers after every question

        


        var correctAnswers = [];
        qa.forEach(function (value) {
          value.answers.forEach(function (v) {
            if (v.correct)
              correctAnswers.push(v.answer);
              $("result").text("all are right");
          });
        });
        if (JSON.stringify(user.answers) == JSON.stringify(correctAnswers))//JSON stringify converts objects to string, used here to debug
          $("pre").text("all are right");
        else
          if (correctAnswers.length == user.answers.length) {
            for (var i = 0; i < correctAnswers.length; i++) {
              if (correctAnswers[i] == user.answers[i]) {
                $("result").append(user.answers[i] + ": Right\n");
                user.correct++;
              } else {
                $("result").append(user.answers[i] + ": Wrong\n");
              }
            }
            $("result").append("\n" + user.correct + " right answers out of " + qa.length + " questions.");
          } else {
            $("result").text("incomplete");
          }


        // Compile the right answers.
        var correctAnswers = [];
        qa.forEach(function (value) {
          value.answers.forEach(function (v) {
            if (v.correct)
              correctAnswers.push(v.answer);
          });
        });
        if (JSON.stringify(user.answers) == JSON.stringify(correctAnswers))//JSON stringify converts objects to string, used here to debug
          $("pre").text("all are right");
        else
          if (correctAnswers.length == user.answers.length) {
            for (var i = 0; i < correctAnswers.length; i++) {
              if (correctAnswers[i] == user.answers[i]) {
                $("pre").append(user.answers[i] + ": Right\n");
                user.correct++;
              } else {
                $("pre").append(user.answers[i] + ": Wrong\n");
              }
            }
            $("pre").append("\n" + user.correct + " right answers out of " + qa.length + " questions.");
          } else {
            $("pre").text("incomplete");
          }
        // Hide the questions and show the exit message.
        $("#questions").fadeOut(function () {
          $("#exit").hide().prop("hidden", false).fadeIn();
        });
      }
    }
  });
  var populateCurrentQuestion = function () {
    var qaIndex = user.currentPage - 1;
    // Clear all selections.
    $(".answer:checked").prop("checked", false);
    $(".next").prop("disabled", true);
    // Check if qa has stuff.
    if (qa.length > 0 && typeof qa[qaIndex] !== "undefined") {
      // There's at least one.
      $("#q-no").text(user.currentPage);
      $("#q-text").text(qa[user.currentPage - 1].question);
      $("#answer-1 + label").text(qa[qaIndex].answers[0].answer).attr("data-correct", qa[qaIndex].answers[0].correct);
      $("#answer-2 + label").text(qa[qaIndex].answers[1].answer).attr("data-correct", qa[qaIndex].answers[1].correct);
      $("#answer-3 + label").text(qa[qaIndex].answers[2].answer).attr("data-correct", qa[qaIndex].answers[2].correct);
      $("#answer-4 + label").text(qa[qaIndex].answers[3].answer).attr("data-correct", qa[qaIndex].answers[3].correct);
      $(".bar").removeAttr("class").addClass("bar bar-" + user.currentPage).text(user.currentPage + "/" + qa.length);
    }
  };
  var handlePrevNextEnablement = function () {
    var qaIndex = user.currentPage - 1;
    // If it is first question, i.e., qaIndex is 0, previous button should be disabled.
    if (qaIndex < 1)
      $(".btn.prev").prop("disabled", true);
    else
      $(".btn.prev").prop("disabled", false);
    // If last question, change it to submit.
    if (qaIndex !== qa.length - 1)
      $(".btn.next").text("Next");
    else
      $(".btn.next").text("Submit");
  };
  $(".answer").on("click change", function () {
    var qaIndex = user.currentPage - 1;
    // At least one answer should be selected and the index should be less than the question length.
    if ($(".answer:checked").length > 0)
      $(".btn.next").prop("disabled", false);
    else
      $(".btn.next").prop("disabled", true);
  });
});