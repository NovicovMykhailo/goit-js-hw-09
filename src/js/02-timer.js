/** 
 * Завдання 2 - таймер зворотного відліку

 Напиши скрипт таймера, який здійснює зворотний відлік до певної дати, 
 який може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. 



Бібліотека flatpickr(https://flatpickr.js.org/)

Використовуй бібліотеку flatpickr для того, 
щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу.
 Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

// Описаний в документації
;
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.

<input type="text" id="datetime-picker" />

Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. 
Ми підготували для тебе об'єкт, який потрібен для виконання завдання. 
Розберися, за що відповідає кожна властивість в документації «Options» (https://flatpickr.js.org/options/), і використовуй його у своєму коді.



======= Вибір дати =======

- Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. 
* Саме у ньому варто обробляти дату, обрану користувачем. 
- Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

1 - Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
2 - Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
3 - Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
4 - Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.

======= Відлік часу =======

- Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, 
і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

- Кількість днів може складатися з більше, ніж двох цифр.
- Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.

//НЕ БУДЕМО УСКЛАДНЮВАТИ
Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.//


 ---- Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

Форматування часу

Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. 
Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, 
то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. 

1 - Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

Бібліотека повідомлень
УВАГА
Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix (https://github.com/notiflix/Notiflix#readme).
*/

import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  starTimer: document.querySelector('[data-start]'),
};

// refs.starTimer.disabled = 'disabled'
// refs.starTimer.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: "    d M Y   H:i",
  altFormat: 'Y-m-d',
  // onClose(selectedDates) {
  //   // currentTimePick = selectedDates[0];
  // },
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      longhand: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'],         
    }, 
    months: {
      shorthand: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лист', 'Гру'],
      longhand: ['Січеньь', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],

    },
  },

};

const calendar = flatpickr(refs.dateTimePicker, options);
let currentTimePick = ''

refs.dateTimePicker.addEventListener('change', ()=>{
  currentTimePick = calendar.selectedDates[0]
  console.dir(currentTimePick)
  

  // console.dir(currentTimePick.toISOString())
  // currentTimePick = calendar.selectedDates[0].toISOString()
  // console.log('currentTimePick', currentTimePick)

  //  const pickedTime= new Date(calendar.selectedDates[0].toISOString());

  
  // var result = pickedTime.getTime()/100000;
  // console.log('result =>', result)
  // console.log(convertMs(pickedTime));
  // console.log('"2012-02-10T13:19:11+0000"')




})


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
  // padStart()
}


// function onClick() {
//   // Notiflix.Report.success('Таймер Запущен', 'Спасибо за то что запустили таймер, Обратный отсчет пошел', 'OK')
//   Notiflix.Notify.failure('Please choose a date in the future', {
//     timeout: 1500,
//     width: '280px',
//     opacity: 1,
//     closeButton: true,
//     cssAnimationStyle: "from-top",
//   }
//   );
// document.querySelector('#NotiflixNotifyWrap').style.cssText = 'position: absolute; left: 400px; top:55px; width: 300px'
// }

