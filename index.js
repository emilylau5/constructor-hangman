var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");

var wordBank = ["volleyball", "basketball", "tennis", "golf", "soccer", "football", "swimming", "rugby", "cheerleading", "gymnastics", "bowling", "skiing", "snowboarding", "badminton", "billiards", "biking", "baseball", "wrestling", "curling", "hockey"]

var letters = "abcdefghijklmnopqrstuvwxyz";
var optionArr = letters.split("");

var chosen;
var ranWordObj = {};

function begin() {
  console.log("Welcome to Sports Hangman!!")
  inquirer.prompt([
    {
      type: "confirm",
      message: "Would you like to start your game?",
      name: "start"
    }
  ]).then(function(response) {
    if (response.start) {
      newRandword();
      console.log(ranWordObj.showSpaces());
      guessLetter();
    }
  })
};

begin();

function newRandword() {
  var wordIndex = Math.floor(Math.random() * wordBank.length);
  chosen = wordBank[wordIndex];
  //passing chosen word to Word func
  ranWordObj = new Word(chosen);
}

function guessLetter() {
  inquirer.prompt([
    {
      name: "guess",
      message: "Guess a letter!"
    }
  ]).then(function(data) {
    
    var guess = data.guess.toLowerCase();

    if(optionArr.indexOf(guess) < 0) {
      console.log("You guessed incorrectly :(");
    }
    else {
      ranWordObj.letterChecker(guess);
    }
    console.log(ranWordObj.showSpaces());
    nextRound();
  });
}

function nextRound() {
  if (ranWordObj.guessesLeft > 0 && !ranWordObj.checker) {
    guessLetter();
  }
  if (ranWordObj.checker || ranWordObj.guessesLeft === 0) {
    if (ranWordObj.checker) {console.log("Congrats!! You won!");}
    else if(ranWordObj.guessesLeft === 0) {console.log("You Lost sorry:(");}
    inquirer.prompt([
      {
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes let me play!", "Let me leave already."],
        name: "playAgain"
      }
    ]).then(function(data) {
      if(data.playAgain === "Yes let me play!") {
        newRandword();
        console.log(ranWordObj.showSpaces());
        guessLetter();
      }
      else {
        console.log("Come play again soon!");
      }
    })
  }
}
