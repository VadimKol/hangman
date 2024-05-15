import { getRandomInteger, isMistake, destroyModal } from "./helper.js";

const keyboardClick = document.querySelector(".grid");
const gallowsClick = document.querySelector(".main-pic");
let fixEsLintfunc;

function closeModal() {
  // закрываем модалку
  destroyModal();
  // physical keyboard
  document.addEventListener("keyup", fixEsLintfunc);

  window.fails = 0; // обнуляем счетчик ошибок
  document.querySelector(".guesses__number").innerText = `${window.fails} / 6`;

  // убираем челобрека
  const head = document.querySelector(".gallows__head");
  const body = document.querySelector(".gallows__body");
  const leftArm = document.querySelector(".gallows__left-arm");
  const rightArm = document.querySelector(".gallows__right-arm");
  const leftLeg = document.querySelector(".gallows__left-leg");
  const rightLeg = document.querySelector(".gallows__right-leg");

  if (head !== null) head.remove();
  if (body !== null) body.remove();
  if (leftArm !== null) leftArm.remove();
  if (rightArm !== null) rightArm.remove();
  if (leftLeg !== null) leftLeg.remove();
  if (rightLeg !== null) rightLeg.remove();

  // восстанавлием клавиатуру
  while (document.querySelector(".disable-btn") !== null) {
    document.querySelector(".disable-btn").classList.toggle("disable-btn");
  }

  // генерим новый вопрос
  window.hangmanPairs = window.hangmanPairs.filter(
    (pair) => pair !== window.currentPair,
  );

  window.currentPair =
    window.hangmanPairs[getRandomInteger(0, window.hangmanPairs.length - 1)];

  console.log(`Answer is ${window.currentPair.answer}`);

  // меняем подсказку и количество подчеркиваний
  const secret = document.querySelector(".secret");
  secret.replaceChildren();

  for (let i = 0; i < window.currentPair.answer.length; i += 1) {
    const secretLetter = document.createElement("li");
    secretLetter.classList.add("secret__letter");
    secretLetter.append("_");
    secret.append(secretLetter);
  }

  const hint = document.querySelector(".hint");
  hint.innerText = "";
  hint.append(`Hint: ${window.currentPair.hint}`);

  document.body.classList.toggle("overflow-body");
}

window.closeModal = closeModal;

function createModal(winLose) {
  const modalBack = document.createElement("div");
  modalBack.classList.add("modal-back");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const resultMsg = document.createElement("p");
  resultMsg.classList.add("modal__msg");
  resultMsg.append("YOU ARE ");
  const result = document.createElement("span");
  result.classList.add("modal__result");
  result.append(winLose);
  resultMsg.append(result);
  modal.append(resultMsg);

  const secretWord = document.createElement("p");
  secretWord.classList.add("modal__secret");
  secretWord.append("Answer is ");
  const answer = document.createElement("span");
  answer.classList.add("modal__answer");
  answer.append(window.currentPair.answer);
  secretWord.append(answer);
  modal.append(secretWord);

  const playAgainBtn = document.createElement("button");
  playAgainBtn.classList.add("modal__new-btn");
  playAgainBtn.type = "button";
  playAgainBtn.append("Play again");
  playAgainBtn.setAttribute("onclick", `${closeModal.name}()`);
  modal.append(playAgainBtn);

  modalBack.append(modal);

  document.body.append(modalBack);
}

function mainLogic(btn) {
  btn.classList.add("disable-btn"); // отключаем кнопку

  const keyboardKey = btn.innerText.toLowerCase();

  if (isMistake(keyboardKey)) {
    window.fails += 1; // увеличиваем счетчик ошибок
    document.querySelector(".guesses__number").innerText =
      `${window.fails} / 6`;

    // рисуем челобрека
    switch (window.fails) {
      case 1: {
        const head = document.createElement("img");
        head.classList.add("gallows__head");
        head.alt = "hangman head";
        head.src = "img/head.svg";
        gallowsClick.append(head);
        break;
      }
      case 2: {
        const body = document.createElement("img");
        body.classList.add("gallows__body");
        body.alt = "hangman body";
        body.src = "img/body.svg";
        gallowsClick.append(body);
        break;
      }
      case 3: {
        const leftArm = document.createElement("img");
        leftArm.classList.add("gallows__left-arm");
        leftArm.alt = "hangman left arm";
        leftArm.src = "img/hand-one.svg";
        gallowsClick.append(leftArm);
        break;
      }
      case 4: {
        const rightArm = document.createElement("img");
        rightArm.classList.add("gallows__right-arm");
        rightArm.alt = "hangman right arm";
        rightArm.src = "img/hand-two.svg";
        gallowsClick.append(rightArm);
        break;
      }
      case 5: {
        const leftLeg = document.createElement("img");
        leftLeg.classList.add("gallows__left-leg");
        leftLeg.alt = "hangman left leg";
        leftLeg.src = "img/leg-one.svg";
        gallowsClick.append(leftLeg);
        break;
      }
      case 6: {
        const rightLeg = document.createElement("img");
        rightLeg.classList.add("gallows__right-leg");
        rightLeg.alt = "hangman right leg";
        rightLeg.src = "img/leg-two.svg";
        gallowsClick.append(rightLeg);
        break;
      }
      default:
        break;
    }

    if (window.fails === 6) {
      document.body.classList.toggle("overflow-body");
      document.removeEventListener("keyup", fixEsLintfunc);
      createModal("LOSE");
    }
  } else {
    // если угадал, то заменяем андерскор на букву
    const secret = document.querySelector(".secret");

    for (let i = 0; i < window.currentPair.answer.length; i += 1)
      if (window.currentPair.answer[i] === keyboardKey)
        secret.children[i].innerText = keyboardKey;

    const answerUser = Array.from(secret.children)
      .map((a) => a.innerText)
      .join("");

    // и в случае, если угадал верно, показываем модалку с успехом
    if (window.currentPair.answer === answerUser) {
      document.body.classList.toggle("overflow-body");
      document.removeEventListener("keyup", fixEsLintfunc);
      createModal("WIN!!!");
    }
  }
}

function physKeyboardLogic(event) {
  const keyCode = event.key.toLowerCase();

  if (
    keyCode.length === 1 &&
    keyCode.charCodeAt(0) - 96 >= 1 &&
    keyCode.charCodeAt(0) - 96 <= 26
  ) {
    // это буква, а не другая клавиша
    const button = document.querySelector(
      `.grid__item-${keyCode.charCodeAt(0) - 96}`,
    );
    if (!button.classList.contains("disable-btn")) mainLogic(button);
  }
}
fixEsLintfunc = physKeyboardLogic;
// virtual keyboard
keyboardClick.onclick = (event) => {
  // делегируем событие с клавиатуры на кнопки
  const button = event.target;

  if (button.tagName !== "BUTTON") return; // клик только на кнопке

  if (!button.classList.contains("disable-btn")) mainLogic(button);
};

// physical keyboard
document.addEventListener("keyup", physKeyboardLogic);
