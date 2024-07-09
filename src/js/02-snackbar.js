import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector("form")

const generatePromise = (delay, state) => new Promise((resolve, rejected) => {
setTimeout(() => {
    if (state === "fulfilled") {
        resolve(delay);
    } else {
        rejected(delay)
    }
    }
    , delay)
});
    
const handlePromiseResult = (event) => {
    event.preventDefault();
    const delayValue = event.target.elements.delay.value;
    const promiseStatute = event.target.elements.state.value;

    const promise = generatePromise(delayValue, promiseStatute);

    promise.then(delay => iziToast.success({
        title: '',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
    }))
        .catch(delay => iziToast.error({
            title: '',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
        }));
    
    clearForm(formEl);
}

const clearForm = (form) => {
    form.reset()
}

formEl.addEventListener("submit", handlePromiseResult);