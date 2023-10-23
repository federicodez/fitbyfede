type State = "new" | "running" | "stopped";
let state: State = "new"; // new, running, stopped
let interval: any;
let startTime: number;
let stopTime: number;

export const start = () => {
  if (state === "running") {
    return;
  }

  interval = setInterval(displayTime, 100); // increase miliseconds by 10

  if (state === "new") {
    startTime = Date.now();
  } else {
    startTime += Date.now() - stopTime;
  }

  state = "running";

  displayTime();
};

export const stop = () => {
  if (state === "stopped" || state === "new") {
    return;
  }

  stopTime = Date.now();

  state = "stopped";

  clearInterval(interval);
};

export const reset = () => {
  stopTime = Date.now();
  startTime = Date.now();

  if (state === "running") {
    clearInterval(interval);
  }

  state = "new";

  displayTime();
};

export const displayTime = () => {
  let now = Date.now() - startTime;
  let hours = Math.floor(now / (60 * 60 * 1000));
  let minutes = Math.floor((now / (60 * 1000)) % 60);
  let seconds = Math.floor((now / 1000) % 60);
  let milliseconds = now % 1000;

  let timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") +
    "." +
    milliseconds.toString().padStart(3, "0");

  return <div>{timeString}</div>;
};
