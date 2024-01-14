const keyboardClick = document.querySelector(".grid");
const gallowsClick = document.querySelector(".main-pic");
const modalClick = document.querySelector(".modal-back");
const modalNewBtnClick = document.querySelector(".modal__new-btn");

// взял из core-js-numbers, случайное число от мин до макс включительно
// генерация на самом деле дерьмовая!, надо будет править
// ИЗ ЗА ЕБАНОГО ЕСЛИНТА ПРИХОДИТЬСЯ ТАК ПИСАТЬ!!!!!!!!!!!!
function getRandomInteger(min, max) {
  return (Math.trunc(Math.random() * 10) % (max - min + 1)) + min;
}

function isMistake(char) {
  // true, если ошибка, то есть буквы нет в слове
  return !window.currentPair.answer.includes(char);
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
      const result = document.querySelector(".modal__result");
      result.innerText = "LOSE";
      document.body.classList.toggle("overflow-body");
      modalClick.classList.toggle("modal-back_show");
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
      const result = document.querySelector(".modal__result");
      result.innerText = "WIN!!!";
      document.body.classList.toggle("overflow-body");
      modalClick.classList.toggle("modal-back_show");
    }
  }
}

keyboardClick.onclick = (event) => {
  // делегируем событие с клавиатуры на кнопки
  const button = event.target;

  if (button.tagName !== "BUTTON") return; // клик только на кнопке

  if (!button.classList.contains("disable-btn")) mainLogic(button);
};

function closeModal() {
  // закрываем модалку
  modalClick.classList.toggle("modal-back_show");

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
    window.hangmanPairs[getRandomInteger(0, window.hangmanPairs.length)];

  // меняем подсказку и количество подчеркиваний
  const secret = document.querySelector(".secret");
  secret.innerHTML = "";

  for (let i = 0; i < window.currentPair.answer.length; i += 1) {
    const secretLetter = document.createElement("li");
    secretLetter.classList.add("secret__letter");
    secretLetter.append("_");
    secret.append(secretLetter);
  }

  const hint = document.querySelector(".hint");
  hint.innerText = "";
  hint.append(`Hint: ${window.currentPair.hint}`);

  // меняем ответ в модалке
  const answer = document.querySelector(".modal__answer");
  answer.innerHTML = "";
  answer.append(window.currentPair.answer);

  document.body.classList.toggle("overflow-body");
}

// дурацкий код из за eslinta !!!!!!!!!! функция у него не используется!!!!!
modalNewBtnClick.setAttribute("onclick", `${closeModal.name}()`);
