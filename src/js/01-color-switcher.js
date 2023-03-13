/*Завдання 1 - перемикач кольорів

1   Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, 
    використовуючи інлайн стиль. Для генерування випадкового кольору використовуй функцію getRandomHexColor.

2   Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

УВАГА
Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

*/

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
  refs.stopBtn.disabled = '';
  refs.startBtn.disabled = 'disabled';
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
} 

function onStop() {
  refs.startBtn.disabled = '';
  clearInterval(timerId);
}
