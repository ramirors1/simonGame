
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColor = $(this).attr("id");
  
    //adds the contents of the variable userChosenColour to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);
  
    playSound(userChosenColor);

    animatePress(userChosenColor); 
  
  });

//a new function
function nextSequence() {

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



