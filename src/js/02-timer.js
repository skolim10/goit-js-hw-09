// all modules//
import Notiflix from 'notiflix';
// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      return (selectedDate = selectedDates[0]);
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}

let dataDays = document.querySelector('[data-days]');
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');

const getDifference = () => {
  const todayTime = new Date().getTime();
  const difference = selectedDate.getTime() - todayTime;
  //console.log(convertMs(difference));//
  //console.log(difference);//
  if (difference < 1000) {
    clearInterval(timerId);
  }
  const resultDays = convertMs(difference).days;
  dataDays.textContent = addLeadingZero(resultDays);

  const resultHours = convertMs(difference).hours;
  dataHours.textContent = addLeadingZero(resultHours);

  const resultMinutes = convertMs(difference).minutes;
  dataMinutes.textContent = addLeadingZero(resultMinutes);

  const resultSeconds = convertMs(difference).seconds;
  dataSeconds.textContent = addLeadingZero(resultSeconds);
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  setInterval(() => {
    getDifference();
  }, 1000);
});
