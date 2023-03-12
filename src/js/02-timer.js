import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
};

refs.btnStart.disabled = true;

let timerId = null;
let timeEnd = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.warning('Please choose a date in the future');
      return;
    } else {
      refs.btnStart.disabled = false;
      timeEnd = selectedDates[0];
    }
  },
};

refs.btnStart.addEventListener('click', onClickBtn);

function onClickBtn() {
  timerId = setInterval(() => {
    const currenTime = Date.now();
    const deltaTime = timeEnd - currenTime;
    if(deltaTime < 0) {
      clearInterval(timerId);
      refs.btnStart.disabled = true;
      return
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }, 1000);
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

flatpickr('input[type="text"]', options);