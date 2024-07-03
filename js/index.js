import { hangmanPairs } from "./hangmanPairs.js";
import { getRandomInteger } from "./helper.js";

window.hangmanPairs = hangmanPairs; // это оч плохой код, исправлю потом может

// так, это важная переменная, здесь вопрос и ответ!
window.currentPair = hangmanPairs[getRandomInteger(0, hangmanPairs.length)];

console.log("Use English keyboard layout!");

console.log(`Answer is ${window.currentPair.answer}`);

// это ошибки, когда нажимаем неправильно, глобал счетчик
window.fails = 0;

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const gallows = document.createElement("div");
gallows.classList.add("gallows");

const mainPic = document.createElement("div");
mainPic.classList.add("main-pic");

const gallowsImg = document.createElement("img");
gallowsImg.classList.add("gallows__pic");
gallowsImg.alt = "gallows";
gallowsImg.src = "img/gallows.svg";

mainPic.append(gallowsImg);

const hangman = document.createElement("h1");
hangman.classList.add("gallows__hangman");
hangman.append("HANGMAN GAME");

const game = document.createElement("div");
game.classList.add("game");

const secret = document.createElement("ul");
secret.classList.add("secret");

for (let i = 0; i < window.currentPair.answer.length; i += 1) {
  const secretLetter = document.createElement("li");
  secretLetter.classList.add("secret__letter");
  secretLetter.append("_");
  secret.append(secretLetter);
}

const hint = document.createElement("p");
hint.classList.add("hint");
hint.append(`Hint: ${window.currentPair.hint}`);

const guesses = document.createElement("p");
guesses.classList.add("guesses");
guesses.append("Incorrect guesses: ");

const guessesNumber = document.createElement("span");
guessesNumber.classList.add("guesses__number");
guessesNumber.append(`${window.fails} / 6`);

guesses.append(guessesNumber);

const keyboard = document.createElement("div");
keyboard.classList.add("grid");

const alhabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

for (let i = 0; i < 26; i += 1) {
  const letter = document.createElement("button");
  letter.classList.add("grid__item");
  letter.classList.add(`grid__item-${i + 1}`);
  letter.type = "button";
  letter.tabIndex = "-1";
  letter.append(alhabet[i]);
  keyboard.append(letter);
}

document.body.append(wrapper);

wrapper.append(gallows);
wrapper.append(game);

gallows.append(mainPic);
gallows.append(hangman);

game.append(secret);
game.append(hint);
game.append(guesses);
game.append(keyboard);
