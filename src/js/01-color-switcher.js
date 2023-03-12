const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  intervalId = setInterval(changeBodyBgColor, 1000);
}

function onStopBtnClick() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}

function changeBodyBgColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}