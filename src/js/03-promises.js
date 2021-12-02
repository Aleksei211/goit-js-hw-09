import { Notify } from "notiflix";

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');


const onFormSubmit = (evt) => {
  evt.preventDefault();
  onGeneratePromises()
  evt.target.reset()
}
form.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
        return
      }
      reject({ position, delay })
    
    }, delay)
  })
}

function onGeneratePromises() {
  const referral = {
    delay: Number(inputDelay.value),
    step: Number(inputStep.value),
    amount: Number(inputAmount.value),
  }
    for (let i = 1; i <= referral.amount; i += 1) {
      createPromise(i, referral.delay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      referral.delay += referral.step;
    }
}