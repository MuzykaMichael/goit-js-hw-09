import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

let delta;
const DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const deltaTime = selectedDates[0] - new Date();
    const isInFuture = deltaTime > 0;

    refs.startBtn.disabled = isInFuture ? false : true;

    if (!isInFuture) {
      Notify.failure('Please, choose a date in the future!');
    }
  },
};

refs.startBtn.disabled = true;

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  setTimer();
  const id = setInterval(() => {
    setTimer();

    if (delta < DELAY) {
      clearInterval(id);
    }
  }, DELAY);
}

function setTimer() {
  delta = getDeltaTime();
  const {days, hours, minutes, seconds} = convertMs(delta);

    refs.outputDays.textContent = addLeadingZero(days);
    refs.outputHours.textContent = addLeadingZero(hours);
    refs.outputMinutes.textContent = addLeadingZero(minutes);
    refs.outputSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getDeltaTime() {
  const chosenDatetime = new Date(refs.input.value);
  const currenTime = new Date();
  return chosenDatetime - currenTime;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}