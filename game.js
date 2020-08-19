alert("Welcome! Instructions: You will be displayed a pattern which you have to remember and then re-enter. At every level a new button will be added to the pattern. Let's see how far your memory takes you!");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false; // storing whether the game has started or not.
var level = 0; //storing the level

$(document).keypress(function() {  //game controller
  if (started == false) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() { //when a button is clicked

  var userChosenColour = $(this).attr("id"); //this is useful
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
    animatePress(userChosenColour);
    if(userClickedPattern.length === gamePattern.length)
    {
	checkAnswer();
    }
});
function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence() {

  userClickedPattern = [];
  level = level + 1;

  $("h1").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function() {
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animating the randomly chosen button
  playSound(randomChosenColour);
  }, 760);
}


function checkAnswer() {
      var flag = true;
      for(var i = 0; i < gamePattern.length; i++){
          if(gamePattern[i] != userClickedPattern[i]){
          flag = false;
          }
      }
      if(flag == true)
      {
        nextSequence();
      }     
     else {
      	playSound("wrong");
      	$("body").addClass("game-over");
      	$("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

