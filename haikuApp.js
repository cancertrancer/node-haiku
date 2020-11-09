const events = require ('events');
const fs = require('fs');
const { rawListeners } = require('process');
const readline = require('readline');

const haikuStream = fs.createWriteStream('output.txt');

let haikuRl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readHaiku = (error, haiku) => {
  if (error) {
      console.log(error);
  } else {
      console.log(`\nWoo-hoo! You just wrote a haiku!\n\nYour haiku is:\n\n${haiku}\nThanks, and adios!\n`);
      process.exit();
  }
}


haikuRl.question("Hi there - let's write the first line of a haiku! Enter a line containing 5 syllables... \n", function recordLineOne(input) {
  let lineOne = input.toString();
  haikuStream.write(`${lineOne}\n`);
  haikuRl.question("Great! Next, write a line containing 7 syllables... \n", function recordLineTwo(input) {
      let lineTwo = input.toString();
      haikuStream.write(`${lineTwo}\n`);
      haikuRl.question("Amazing! Complete your haiku with a line containing 5 syllables... \n", function recordLineThree(input) {
          let lineThree = input.toString();
          haikuStream.write(`${lineThree}\n`);
          haikuRl.close();
      });
  });
});

haikuRl.on('close', function() {
  fs.readFile('output.txt', 'utf-8', readHaiku);
});

//Sweet, Node will create output.txt if nonexistent! 
//Next, will see how to append another haiku to output or create a new output files instead of overwriting!