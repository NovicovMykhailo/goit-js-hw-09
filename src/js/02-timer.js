import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
//flatpicker options

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: '    d M Y   H:i',
  altFormat: 'Y-m-d',
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      longhand: [
        'Неділя',
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        "П'ятниця",
        'Субота',
      ],
    },
    months: {
      shorthand: [
        'Січ',
        'Лют',
        'Бер',
        'Кві',
        'Тра',
        'Чер',
        'Лип',
        'Сер',
        'Вер',
        'Жов',
        'Лист',
        'Гру',
      ],
      longhand: [
        'Січеньь',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень',
      ],
    },
  },
};

//REFS Elements
const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  timerValues: document.querySelectorAll('.value'),
  starTimer: document.querySelector('[data-start]'),
};

refs.starTimer.disabled = 'disabled'; //Disabling Button
refs.starTimer.enabled = ''; // remove Enable atr

const calendar = flatpickr(refs.dateTimePicker, options); // FlatPicker Init

refs.dateTimePicker.addEventListener('change', onChange);// date field change (4 notification validation)
refs.starTimer.addEventListener('click', onClick);// Start timer button

function onChange() {
  const pickedTime = new Date(calendar.selectedDates[0]).getTime();
  let timeNow = new Date().getTime();
  let countDown = pickedTime - timeNow;

  //validation 4 notifications
  //Falture notification
  if (countDown <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 1500,
      width: '280px',
      opacity: 1,
      cssAnimationStyle: 'from-top',
    });
    document.querySelector('#NotiflixNotifyWrap').style.cssText =
      'position: absolute; left: 400px; top:55px; width: 300px';

    refs.starTimer.disabled = 'disabled'; // button Disabling
    refs.starTimer.enebled = ''; // remove Enable atr

    return;
  } else {
    refs.starTimer.disabled = ''; // remove Disable atr
    refs.starTimer.enebled = 'enabled'; //Enabling Button

    //Sucsess notification

    Notiflix.Notify.success('It looks ok now you can choose the date', {
      timeout: 1500,
      width: '280px',
      opacity: 1,
      cssAnimationStyle: 'from-top',
    });
    document.querySelector('#NotiflixNotifyWrap').style.cssText =
      'position: absolute; left: 400px; top:55px; width: 300px';
  }
}
function onClick() {
  const pickedTime = new Date(calendar.selectedDates[0]).getTime();
  let timeNow = new Date().getTime();
  let countDown = pickedTime - timeNow;

  // validation 4 reports notifications

  if (countDown <= 0) {
    clearInterval(x);
    return;
  } else {
    Notiflix.Report.success(
      'WellDone!',
      'Thanks for starting the timer, the countdown has begun',
      'OK',
      delaySet
    );
    function delaySet() {
      setTimeout(onReportClose, 2000);
    }
  }

  // timer function
  let x = setInterval(() => {
    timeNow = new Date().getTime();
    countDown = pickedTime - timeNow;
    let convertedDayTime = convertMs(countDown);
    //auto close timer when countdown is finish
    if (countDown <= 0) {
      clearInterval(x);
      window.alert('"EXPIRED"');
      setDefaultValues();
    }
    // preRender and normalising interface
    let result = addLeadingZero(convertedDayTime);
    //Render
    renderInterface(result);
  }, 1000);

  // after timer start notifications
  refs.starTimer.disabled = 'disabled'; // Disablink Button
  refs.starTimer.enabled = ''; // remove Enable atr

  //callback Visualising Stop Button
  function onReportClose() {
    Notiflix.Confirm.show(
      'If you cant`t wait anymore',
      'To stop the timer and restart the countdown, click the "STOP" button below 🡻',
      'STOP'
    );
    document
      .querySelector('#NXConfirmButtonOk')
      .addEventListener('click', stopTimer);

    // Stop timer button function
    function stopTimer() {
      clearInterval(x);
      setDefaultValues();

      refs.starTimer.disabled = '';
      refs.starTimer.enabled = 'enabled';
    }
    document.querySelector('#NotiflixConfirmWrap').style.cssText =
      'background-color: none';
  }
}
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
function addLeadingZero(value) {
  let { days, hours, minutes, seconds } = value;

  let daysN;
  let hoursN;
  let minutesN;
  let secondsN;

  if (days < 10) {
    daysN = days.toString().padStart(2, '0');
  } else {
    daysN = days;
  }
  if (hours < 10) {
    hoursN = hours.toString().padStart(2, '0');
  } else {
    hoursN = hours;
  }
  if (minutes < 10) {
    minutesN = minutes.toString().padStart(2, '0');
  } else {
    minutesN = minutes;
  }
  if (seconds < 10) {
    secondsN = seconds.toString().padStart(2, '0');
  } else {
    secondsN = seconds;
  }
  return { daysN, hoursN, minutesN, secondsN };
}
function renderInterface(value) {
  let { daysN, hoursN, minutesN, secondsN } = value;

  refs.timerValues[0].textContent = daysN;
  refs.timerValues[1].textContent = hoursN;
  refs.timerValues[2].textContent = minutesN;
  refs.timerValues[3].textContent = secondsN;
}
function setDefaultValues() {
  refs.timerValues[0].textContent = '00';
  refs.timerValues[1].textContent = '00';
  refs.timerValues[2].textContent = '00';
  refs.timerValues[3].textContent = '00';
}
