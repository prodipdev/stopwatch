const timerDisplay = document.getElementById("timer-display");
const timerBadge = document.getElementById("timer-badge");

// Get Control Buttons
const startStopBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");

// Timer Count Digits
let sec = 0;
let min = 0;
let hours = 0;
// Stored time interval
let timeInterval = null;

// Timer Mechanism Methods
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
};

// Start/Stop Timer Button
let isStop = true;
startStopBtn.addEventListener('click', () => {
    // Starting Timer
    if (isStop) {
        isStop = false;
        // Fixing bug for multiple clicked on start button
        if (timeInterval !== null) {
            clearInterval(timeInterval);
        }
        // Always increment 1 second
        timeInterval = setInterval(timerMethods, 1000);

        // Remove play button
        startStopBtn.classList.remove("text-green-500", "active:text-green-600")
        // Create stop button
        startStopBtn.innerHTML = `<i class="fa-solid fa-circle-stop"></i>`;
        startStopBtn.classList.add("text-amber-500", "active:text-amber-600")
        // Enable reset button
        resetBtn.classList.remove("opacity-40", "cursor-not-allowed");

        // Set start badge
        timerBadge.classList.remove("bg-rose-500", "shadow-rose-400", "bg-amber-500", "shadow-amber-400");
        timerBadge.classList.add("bg-green-500", "shadow-green-400");
    }
    // Stop Timer
    else {
        isStop = true;
        clearInterval(timeInterval);

        // Remove stop button
        startStopBtn.classList.remove("text-amber-500", "active:text-amber-600");
        // Create play button
        startStopBtn.innerHTML = `<i class="fa-solid fa-circle-play">`;
        startStopBtn.classList.add("text-green-500", "active:text-green-600");

        // Set stop badge
        timerBadge.classList.remove("bg-green-500", "shadow-green-400");
        timerBadge.classList.add("bg-amber-500", "shadow-amber-400");
    }
});


// reset Timer
resetBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    [sec, min, hours] = [0, 0, 0];
    timerDisplay.innerText = `00:00:00`;

    // Disabled reset button
    resetBtn.classList.add("opacity-40", "cursor-not-allowed");
    // Create play button
    isStop = true;
    startStopBtn.innerHTML = `<i class="fa-solid fa-circle-play">`;
    startStopBtn.classList.remove("text-amber-500", "active:text-amber-600");
    startStopBtn.classList.add("text-green-500", "active:text-green-600");

    // Set default badge
    timerBadge.classList.remove("bg-green-500", "shadow-green-400", "bg-amber-500", "shadow-amber-400");
    timerBadge.classList.add("bg-rose-500", "shadow-rose-400");
});