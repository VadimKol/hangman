// взял из core-js-numbers, случайное число от мин до макс включительно
// генерация на самом деле дерьмовая!, надо будет править
export function getRandomInteger(min, max) {
  return (Math.trunc(Math.random() * 10) % (max - min + 1)) + min;
}

export function isMistake(char) {
  // true, если ошибка, то есть буквы нет в слове
  return !window.currentPair.answer.includes(char);
}

export function destroyModal() {
  document.querySelector(".modal-back").remove();
}
