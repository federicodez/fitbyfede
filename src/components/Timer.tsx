"use client";

import { useState } from "react";

const StartTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tens, setTens] = useState(0o0);
  const [appendMinutes, setAppendMinutes] = useState("");
  const [appendTens, setAppendTens] = useState<number | string>("");
  const [appendSeconds, setAppendSeconds] = useState<number | string>("");
  const [startBtn, setStartBtn] = useState("");
  const [stopBtn, setStopBtn] = useState("");
  const [resetBtn, setResetBtn] = useState("");
  let Interval: any;

  const startTimer = () => {
    setTens(tens + 1);
    if (tens <= 9) {
      setAppendTens("0" + tens);
    }
    if (tens > 9) {
      setAppendTens(tens);
    }

    if (tens > 99) {
      setSeconds(seconds + 1);
      setAppendSeconds("0" + seconds);
      setTens(0);
      setAppendTens("0" + 0);
    }

    if (seconds > 9) {
      setAppendSeconds(seconds);
    }

    if (seconds > 59) {
      setMinutes(minutes + 1);
      setAppendMinutes("0" + minutes);
      setSeconds(0);
      setAppendSeconds("0" + 0);
    }
  };

  return (
    <>
      <div
        id="startBtn"
        onClick={() => {
          clearInterval(Interval);
          Interval = setInterval(startTimer, 10);
        }}
      >
        Start
        {Interval}
      </div>
      <div id="stopBtn" onClick={() => clearInterval(Interval)}>
        Stop
      </div>
      <div
        id="resetBtn"
        onClick={() => {
          clearInterval(Interval);
          setTens(0o0);
          setSeconds(0o0);
          setMinutes(0o0);
          setAppendTens(tens);
          setAppendSeconds(seconds);
          setAppendMinutes(`${minutes}`);
        }}
      >
        Reset
      </div>
    </>
  );
};

export default StartTimer;
