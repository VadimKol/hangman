const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const gallows = document.createElement("div");
gallows.classList.add("gallows");

const gallowsImg = document.createElement("img");
gallowsImg.classList.add("gallows__pic");
gallowsImg.alt = "gallows";
gallowsImg.src = "img/gallows.svg";

const hangman = document.createElement("p");
hangman.classList.add("gallows__hangman");

const game = document.createElement("div");
game.classList.add("game");

const secret = document.createElement("ul");
secret.classList.add("secret");

const hint = document.createElement("p");
hint.classList.add("hint");

const guesses = document.createElement("p");
guesses.classList.add("guesses");

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
