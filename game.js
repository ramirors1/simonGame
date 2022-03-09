
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, it changes to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColor = $(this).attr("id");
  
    //adds the contents of the variable userChosenColour to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);
  
    playSound(userChosenColor);

    animatePress(userChosenColor); 

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
  
  });

//function called checkAnswer(), takes one input with the name currentLevel
function checkAnswer(currentLevel) {

  //if statement checks if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the user got the most recent answer right, then check that they have finished their sequence.
    if (userClickedPattern.length === gamePattern.length){

      //call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else  {

    console.log("wrong");
    playSound("wrong");

     //adds class, game-over if the user gets one of the answers wrong and then removes it after 200 milliseconds.
     $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     //h1 title changes to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
     $("#level-title").text("Game Over, Press Any Key to Restart");

     //calls startOver function when game is over
     startOver();
   }

}

//a new function
function nextSequence() {

    //Once nextSequence() is triggered, resets the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

     //increase the level by 1 every time nextSequence() is called.
    level++;

    //update the h1 with the value of level.
    $("#level-title").text("Level " + level);

    //generates a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4);

    //a new variable called randomChosenColour and uses the randomNumber to select a random colour from the buttonColours array.
    var randomChosenColor = buttonColors[randomNumber];

    //the new randomChosenColour that was generated and is added to the end of the gamePattern.
    gamePattern.push(randomChosenColor);

    //Selects id of randomChosenColor and animtes it with fade
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //plays a sound for the selected button
    playSound(randomChosenColor); 
 } 



function playSound(name) {

    //refactored code from nextSequence() function to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {

    //jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
    //removes the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  //function resets game to begin new game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

