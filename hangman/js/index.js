const hangmanPairs = [
  {
    hint: "A human-powered vehicle with two wheels",
    answer: "bicycle",
  },
  {
    hint: "Capital of Finland",
    answer: "helsinki",
  },
  {
    hint: "Smallest planet in our solar system",
    answer: "mercury",
  },
  {
    hint: "Gordon Sumner is the real name of what famous British musician",
    answer: "sting",
  },
  {
    hint: "Which colour pill does Neo swallow in The Matrix",
    answer: "red",
  },
  {
    hint: "A screwdriver cocktail is orange juice, ice and which spirit",
    answer: "vodka",
  },
  {
    hint: "Capital city of Australia",
    answer: "canberra",
  },
  {
    hint: "What part of a plant conducts photosynthesis",
    answer: "leaf",
  },
  {
    hint: "What company is also the name of one of the longest rivers in the world",
    answer: "amazon",
  },
  {
    hint: "How many planets are in our solar system",
    answer: "eight",
  },
];

window.hangmanPairs = hangmanPairs; // это оч плохой код, исправлю потом может

// взял из core-js-numbers, случайное число от мин до макс включительно
// генерация на самом деле дерьмовая!, надо будет править
function getRandomInteger(min, max) {
  return (Math.trunc(Math.random() * 10) % (max - min + 1)) + min;
}

// так, это важная переменная, здесь вопрос и ответ!
const currentPair = hangmanPairs[getRandomInteger(0, hangmanPairs.length)];

window.currentPair = currentPair;
// это ошибки, когда нажимаем неправильно, глобал счетчик
window.fails = 0;

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const gallows = document.createElement("div");
gallows.classList.add("gallows");

const gallowsImg = document.createElement("img");
gallowsImg.classList.add("gallows__pic");
gallowsImg.alt = "gallows";
gallowsImg.src = "img/gallows.svg";

const hangman = document.createElement("h1");
hangman.classList.add("gallows__hangman");
hangman.append("HANGMAN GAME");

const game = document.createElement("div");
game.classList.add("game");

const secret = document.createElement("ul");
secret.classList.add("secret");

for (let i = 0; i < currentPair.answer.length; i += 1) {
  const secretLetter = document.createElement("li");
  secretLetter.classList.add("secret__letter");
  secretLetter.append("_");
  secret.append(secretLetter);
}

const hint = document.createElement("p");
hint.classList.add("hint");
hint.append(`Hint: ${currentPair.hint}`);

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
  letter.append(alhabet[i]);
  keyboard.append(letter);
}
document.body.append(wrapper);
wrapper.append(gallows);
wrapper.append(game);
gallows.append(gallowsImg);
gallows.append(hangman);
game.append(secret);
game.append(hint);
game.append(guesses);
game.append(keyboard);

// модалка
const modalBack = document.createElement("div");
modalBack.classList.add("modal-back");

const modal = document.createElement("div");
modal.classList.add("modal");

const resultMsg = document.createElement("p");
resultMsg.classList.add("modal__msg");
resultMsg.append("YOU ARE ");
const result = document.createElement("span");
result.classList.add("modal__result");
result.append("LOSE");
resultMsg.append(result);
modal.append(resultMsg);

const secretWord = document.createElement("p");
secretWord.classList.add("modal__secret");
secretWord.append("Answer is ");
const answer = document.createElement("span");
answer.classList.add("modal__answer");
answer.append(currentPair.answer);
secretWord.append(answer);
modal.append(secretWord);

const playAgainBtn = document.createElement("button");
playAgainBtn.classList.add("modal__new-btn");
playAgainBtn.type = "button";
playAgainBtn.append("Play again");
// playAgainBtn.setAttribute("onclick", "closeModal()"); // ESLINT!!!!!!!!
modal.append(playAgainBtn);

modalBack.append(modal);

wrapper.append(modalBack);
