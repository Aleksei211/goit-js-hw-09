import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

let selectedTime = null;

const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', theCountdownStarted);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onClickBtn() {
  return selectedTime - new Date().getTime()
};

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() < new Date().getTime()){
             window.alert('Please choose a date in the future',{timeout: 5000,},);
              startBtn.setAttribute('disabled', true)
            return;
        }
        selectedTime = selectedDates[0].getTime()

        startBtn.removeAttribute('disabled')
        
    },
  })
 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero( Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function theCountdownStarted() {
  setInterval(() => {
        if (onClickBtn() < 1) {
   return
  }
        const { days, hours, minutes, seconds } = convertMs(onClickBtn())
        updateTime({ days, hours, minutes, seconds })
    }, 1000)

}
   function updateTime({days, hours, minutes, seconds}) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
  }