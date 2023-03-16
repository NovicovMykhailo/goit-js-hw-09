import Notiflix from 'notiflix';


const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};
let counter = 1;
let intervalId = null;

refs.form.addEventListener('submit', onSubmit);


function onSubmit(e) {
  e.preventDefault();
  intervalId = setInterval(intervalFn, refs.step.value);
}

function intervalFn() {
  if (counter === Number(refs.amount.value) + 1) {
    clearInterval(intervalId);
    counter = 1;
    refs.amount.value =''
    refs.delay.value = ''
    refs.step.value = ''
    return;
  }
  createPromise(counter, refs.delay.value);
}

function createPromise(position, delay) {
  new Promise((resolve, reject) => {
    {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve; // Fulfill
         
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            {
              timeout: 10000,
              width: '280px',
              opacity: 1,
              cssAnimationStyle: 'from-top',
            }
          );
        } else {
          reject; // Reject
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            timeout: 10000,
            width: '280px',
            opacity: 1,
            cssAnimationStyle: 'from-top',
          });
          
        }
      }, delay);
    }
  });

  counter += 1;
}
