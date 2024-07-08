import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector("form")

const makePromise = (event) => {
event.preventDefault();
const delayValue = event.target.elements.delay.value;
const promiseStatute = event.target.elements.state.value;

const promise = new Promise((resolve, rejected) => {
    setTimeout(() => {
        if (promiseStatute === "fulfilled") {
        resolve(delayValue);
    } else {
        rejected(delayValue)
     }}
    , delayValue)
    
});
    promise.then(delay => iziToast.success({
        title: '',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
    }))
        .catch(delay => iziToast.error({
        title: '',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        }))
    formEl.reset();
}


formEl.addEventListener("submit", makePromise);