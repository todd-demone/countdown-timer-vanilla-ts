// 2. Set State variables
let isRunning: boolean = false;
let intervalId: number | undefined = undefined;
let totalSeconds: number = 0;

// 3. Grab DOM elements
const hoursInput = document.getElementById("hoursInput") as HTMLInputElement;
const minutesInput = document.getElementById("minutesInput") as HTMLInputElement;
const secondsInput = document.getElementById("secondsInput") as HTMLInputElement;

const controlButton = document.getElementById("controlButton") as HTMLButtonElement;

const resetButton = document.getElementById("resetButton") as HTMLButtonElement;

const display = document.getElementById("display") as HTMLSpanElement | null;

if (!hoursInput || !minutesInput || !secondsInput || !controlButton || !resetButton) {
  throw new Error("One or more html elements are missing.");
}

// 4. Attach event listeners

controlButton.addEventListener("click", handleControlClick);
resetButton.addEventListener("click", handleResetClick);

// 5. Handler functions

function handleControlClick(event: MouseEvent): void {
  event.preventDefault();

  // START THE TIMER
  if (!isRunning) {
    // Teaching: optional chaining operator (?.)
    // if the operand to left of ?. is null or undefined,
    // the entire expressed evaluates to undefined,
    // and the subsequent property access or method call is skipped.
    // CALCULATE TOTALSECONDS
    if (totalSeconds == 0) {
      const hoursString = hoursInput?.value || "0";
      const hours = parseInt(hoursString) || 0;
      const minutesString = minutesInput?.value || "0";
      const minutes = parseInt(minutesString) || 0;
      const secondsString = secondsInput?.value || "0";
      const seconds = parseInt(secondsString) || 0;

      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    isRunning = true;
    controlButton.textContent = "Pause";
    updateDisplay();
    intervalId = setInterval(tick, 1000);

    // PAUSE THE TIMER
  } else {
    isRunning = false;
    clearInterval(intervalId);
    controlButton.textContent = "Start";
  }
}

// CALLBACK FOR SETINTERVAL()
function tick() {
  totalSeconds--;
  updateDisplay();

  if (totalSeconds <= 0) {
    isRunning = false;
    clearInterval(intervalId);
    updateDisplay();
  }
}

// UPDATE VIEW
function updateDisplay(): void {
  if (totalSeconds <= 0) {
    display!.textContent = "00:00:00";
    return;
  }

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  display!.textContent = `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
}

function addZero(num: number): string {
  return num < 10 ? "0" + num : String(num);
}

function handleResetClick() {
  isRunning = false;
  clearInterval(intervalId);
  totalSeconds = 0;
  display!.textContent = "00:00:00";
  controlButton!.textContent = "Start";
  hoursInput!.value = "0";
  minutesInput!.value = "0";
  secondsInput!.value = "0";
}
