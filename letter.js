var Letter = function(str) {
  if(str !== " ") {
    this.type = "letter";
    this.value = str;
    this.baseValue = str.toLowerCase();
    this.checker = false;
    this.output = "-"
    this.show = function(check) {
      if(this.baseValue === check) {
        this.checker = true;
        this.output = this.value;
        return true;
      }
      else if (!this.checker) {
        this.output = "-";
      }
    }
  }
  else {
    this.type = "space";
    this.value = str;
    this.checker = true;
    this.output = " ";
    this.show = function(check) {
    }
  }
}

module.exports = Letter;