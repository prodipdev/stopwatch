const timerDisplay = document.getElementById("timer-display");

// Control Buttons
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

// Timing Count Digits
let sec = 0;
let min = 0;
let hours = 0;
// Stored time interval
let timeInterval = null;

// Start Timer
startBtn.addEventListener('click', () => {
    // Fixing bug for multiple clicked on start button
    if (timeInterval !== null) {
        clearInterval(timeInterval);
    }
    timeInterval = setInterval(timerMethods, 1000);

    // Button UI Control
    startBtn.classList.add("opacity-40", "cursor-not-allowed");
    stopBtn.classList.remove("opacity-40", "cursor-not-allowed");
    resetBtn.classList.remove("opacity-40", "cursor-not-allowed");

});

// Stop Timer
stopBtn.addEventListener('click', () => {
    clearInterval(timeInterval);

    // Button UI Control
    startBtn.classList.remove("opacity-40", "cursor-not-allowed");
    stopBtn.classList.add("opacity-40", "cursor-not-allowed");
    resetBtn.classList.remove("opacity-40", "cursor-not-allowed");
})

// reset Timer
resetBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    [sec, min, hours] = [0, 0, 0];
    timerDisplay.innerText = `00:00:00`;

    // Button UI Control
    startBtn.classList.remove("opacity-40", "cursor-not-allowed");
    stopBtn.classList.add("opacity-40", "cursor-not-allowed");
    resetBtn.classList.add("opacity-40", "cursor-not-allowed");
})


// Time Mechanism Methods
const timerMethods = () => {
    sec++
    if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
            min = 0;
            hours++;
        }
    }
    // Set 2 digit timer
    const setSec = sec < 10 ? `0${sec}` : sec;
    const setMin = min < 10 ? `0${min}` : min;
    const setHour = hours < 10 ? `0${hours}` : hours;

    // Display Time
    timerDisplay.innerText = `${setHour}:${setMin}:${setSec}`;
}