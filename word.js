var Letter = require("./letter.js");

var Word = function(randWord) {
  this.lettersToGuess = [];
  for (var i=0; i<randWord.length; i++) {
    this.lettersToGuess.push(new Letter(randWord[i]));
  }

  this.checker = false;
  this.guessesLeft = 6;
  this.guessedLetters = [];

  this.letterChecker = function (check) {
    this.guessedLetters.push(check);
    var correct = false;
    this.checker = true;
    for (index in this.lettersToGuess) {

      var result = this.lettersToGuess[index].show(check);
      if(result) correct = result;

      if(!this.lettersToGuess[index].checker) {
        this.checker = false;
      }
    }

    if(correct) {
      console.log("You got it right!!!");
    }
    else {
      console.log("You're wrong sorry:(");
      this.guessesLeft--;
      console.log("You have " + this.guessesLeft + " guesses left!!");
    }
  }

  this.showSpaces = function() {
    var displayWord = "";
    for (index in this.lettersToGuess) {
      displayWord += this.lettersToGuess[index].output;
        displayWord += " ";
    }
    return displayWord;
  }
}

module.exports = Word;