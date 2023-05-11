import {Notify} from 'notiflix/build/notiflix-aio'

const refs = {
  delay:document.querySelector('[name="delay"]'),
  step:document.querySelector('[name="step"]'),
  amount:document.querySelector('[name="amount"]'),
  form:document.querySelector(".form")
}

refs.form.addEventListener('submit',submitForm)

function submitForm(e){
  e.preventDefault();
  const {
    elements:{delay,step,amount}
  } = e.currentTarget;

  for (let i = 0; i< amount.value;i+=1){
    const delayCount = +delay.value + +step.value*i;
    createPromise(i,delayCount)
      .then(result=>Notify.success(result))
      .catch(error=>Notify.failure(error))
  }
}


function createPromise(position, delay) {
  return new Promise((result,reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        result(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    },delay)
  })
}