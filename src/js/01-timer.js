import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";

const btn = document.querySelector("button");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");
const timerEl = document.querySelector(".timer")

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
onClose(selectedDates) {
  if (selectedDates[0].getTime() < Date.now()) {
    window.alert("Please choose a date in the future");
    daysEl.textContent = `00`;
    hoursEl.textContent = `00`;
    minutesEl.textContent = `00`;
    secondsEl.textContent = `00`;
    btn.setAttribute("disabled", "")
  } else if (selectedDates[0].getTime() > Date.now()) {
    btn.removeAttribute("disabled");
    userSelectedDate = selectedDates[0].getTime();
    dateFormatToAdd(timeDiference(userSelectedDate, convertMs));
  }
  },
};

flatpickr("#datetime-picker", options);

const timeDiference = (someDate, callback) => {
    const timeNow = Date.now();
    const counteredTime = someDate - timeNow ;
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



const dateFormatToAdd = ({ days, hours, minutes, seconds }) => {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;
}





