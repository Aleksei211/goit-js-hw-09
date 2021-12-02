const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

function backgroundColor() {
    document.body.style.background = `${getRandomHexColor()}`
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
       backgroundColor()
    }, 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
})

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
});
