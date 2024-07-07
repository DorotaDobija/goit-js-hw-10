import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector("button");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
onClose(selectedDates) {
  if (selectedDates[0].getTime() < Date.now()) {
    btn.setAttribute("disabled", "");
    iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight',
});
  } else if (selectedDates[0].getTime() > Date.now()) {
    btn.removeAttribute("disabled");
    userSelectedDate = selectedDates[0].getTime();
  }
  },
};

flatpickr("#datetime-picker", options);

let counteredTime = 0;

const timeDiference = (someDate, callback) => {
    const timeNow = Date.now();
    counteredTime = someDate - timeNow ;
    return callback(counteredTime);
}

const convertMs = (ms) => {
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

const addLeadingZero = (value) => {
  const arrOfValues = Object.values(value);
  return arrOfValues
    .map((item) => item
      .toString()
      .padStart(2, "0"));
}

const dateFormatToAdd = ({ days, hours, minutes, seconds }) => {
 const formatToAdd = addLeadingZero({ days, hours, minutes, seconds });
  daysEl.textContent = `${formatToAdd[0]}`;
  hoursEl.textContent = `${formatToAdd[1]}`;
  minutesEl.textContent = `${formatToAdd[2]}`;
  secondsEl.textContent = `${formatToAdd[3]}`;
}

const clearFunc = (timerId) => {
      clearInterval(timerId);
      btn.setAttribute("disabled", "");
} 
  
const counterChange = () => {
  dateFormatToAdd(timeDiference(userSelectedDate, convertMs));
  const timerInterval = setInterval(() => {
    userSelectedDate--;
    dateFormatToAdd(timeDiference(userSelectedDate, convertMs));
     if (counteredTime < 1000) {
      clearFunc(timerInterval)
    };
  }, 1_000);
}

btn.addEventListener("click", counterChange);