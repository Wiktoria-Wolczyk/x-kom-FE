import React from "react";
import { useState, useEffect } from "react";

interface ItimeObj {
  hour: number;
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const [timeObj, setTimeObj] = useState<ItimeObj>({
    hour: 7,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    if (timeObj.seconds === 0 && timeObj.minutes === 0 && timeObj.hour === 0) {
      return;
    } else {
      const interval = setInterval(() => {
        const fullSeconds = 59;
        const fullMinutes = 59;

        let newObj = {
          ...timeObj,
        };

        if (timeObj.seconds !== 0) {
          newObj = {
            ...timeObj,
            seconds: timeObj.seconds - 1,
          };
          setTimeObj(newObj);
        } else if (timeObj.minutes === 0) {
          newObj = {
            ...timeObj,
            hour: timeObj.hour - 1,
            minutes: fullMinutes,
            seconds: fullSeconds,
          };
          setTimeObj(newObj);
        } else if (timeObj.seconds === 0) {
          newObj = {
            ...timeObj,
            minutes: timeObj.minutes - 1,
            seconds: fullSeconds,
          };
          setTimeObj(newObj);
        } else if (timeObj.hour === 0) {
          newObj = {
            ...timeObj,
            hour: 0,
            minutes: fullMinutes,
            seconds: timeObj.seconds - 1,
          };
          setTimeObj(newObj);
        }

        // if (timeObj.minutes !== 0) {
        //   newObj = {
        //     ...timeObj,
        //     minutes: timeObj.minutes - 1,
        //   };
        //   setTimeObj(newObj);
        // } else {
        //   newObj = {
        //     ...timeObj,
        //     hour: timeObj.hour - 1,
        //     minutes: 0,
        //   };
        //   setTimeObj(newObj);
        // }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeObj]);

  return (
    <>
      <div className="containerForTimer">
        <p className="textInTimer">Śpiesz się, oferta kończy się za:</p>
        <div className="hotShotTimer">
          <div className="centerTimeText">
            <div className="hourInHotShotTimer">{timeObj.hour}</div>
            <p>godz.</p>
          </div>
          <p className="colonInTimer">:</p>
          <div className="centerTimeText">
            <div className="minuteInHotShotTimer">{timeObj.minutes}</div>
            <p>min.</p>
          </div>
          <p className="colonInTimer">:</p>
          <div className="centerTimeText">
            <div className="secondInHotShotTimer">{timeObj.seconds}</div>
            <p>sek.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
