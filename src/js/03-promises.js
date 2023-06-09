import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

let counter = 1;
let intervalId = null;
let finalDelay = 0;
let promiceResult;

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  finalDelay = Number(refs.delay.value) + Number(refs.step.value);
  intervalId = setInterval(intervalFn, refs.step.value);
}

function onInput() {
  refs.amount.value = '';
  refs.delay.value = '';
  refs.step.value = '';
  refs.form.removeEventListener('click', onInput);
}

function intervalFn() {
  if (counter === Number(refs.amount.value) + 1) {
    clearInterval(intervalId);
    counter = 1;
    return;
  }
  createPromise(counter, refs.delay.value)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${finalDelay}ms`,
        {
          timeout: 10000,
          width: '280px',
          opacity: 1,
          cssAnimationStyle: 'from-top',
        }
      );
      finalDelay += Number(refs.step.value);
    })
    .catch(({ position, delay}) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${finalDelay}ms`,
        {
          timeout: 10000,
          width: '280px',
          opacity: 1,
          cssAnimationStyle: 'from-top',
        }
      );
      finalDelay += Number(refs.step.value);
    });
  refs.form.addEventListener('click', onInput);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        counter += 1;
        if (shouldResolve) {
          resolve({ position, delay }); // Fulfill
        } else {
          reject({ position, delay }); // Reject
        }
      }, delay);
    }
  });
}
