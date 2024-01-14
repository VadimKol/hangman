const keyboardClick = document.querySelector(".grid");
const gallowsClick = document.querySelector(".gallows");
const modalClick = document.querySelector(".modal-back");

function mainLogic(btn) {
  btn.classList.add("disable-btn"); // отключаем кнопку

  // if (OSHIBKA){
  window.fails += 1; // увеличиваем счетчик ошибок
  document.querySelector(".guesses__number").innerText = `${window.fails} / 6`;

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
    modalClick.classList.toggle("modal-back_show");
  }
  // } else {

  // }
}

keyboardClick.onclick = (event) => {
  // делегируем событие с клавиатуры на кнопки
  const button = event.target;

  if (button.tagName !== "BUTTON") return; // клик только на кнопке

  if (!button.classList.contains("disable-btn")) mainLogic(button);
};
