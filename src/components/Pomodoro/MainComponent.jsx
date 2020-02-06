import React, { useState, useEffect } from "react";
import CirularProgressBar from "./CircularProgressBar";

const MainComponent = ({ selectedTodo, handleTomatoesPoints }) => {
    const formatSeconds = secLeft => {
        // Pause 1 sec at end of cycle by showing 00:00 when time is -1 sec
        const cleanSec = Math.max(0, secLeft);
        const minutes = ("0" + Math.floor(cleanSec / 60)).slice(-2);
        const seconds = ("0" + (cleanSec % 60)).slice(-2);
        return minutes + ":" + seconds;
    };

    const [workMinutes] = useState(0.2);
    const [workColor] = useState("red");
    const [breakMinutes] = useState(0.2);
    const [breakColor] = useState("green");
    const [countDownTime, setCountDownTime] = useState(workMinutes);
    const [secondsLeft, setSecondsLeft] = useState(countDownTime * 60);
    const [timeLeft, setTimeLeft] = useState(formatSeconds(workMinutes * 60));
    const [percentage, setPercentage] = useState(0);
    const [cycle, setCycle] = useState("work");
    const [progressColor, setProgressColor] = useState(workColor);
    const [isActive, setIsActive] = useState(false);

    const [count, setCount] = useState(0);

    const handleStartClick = () => {
        console.log("start-pause handler");
        setIsActive(!isActive);
    };

    const handleResetClick = () => {
        console.log(`Handling reset`);
        setIsActive(false);
        setCycle("work");
        setCountDownTime(workMinutes);
        setSecondsLeft(countDownTime * 60);
        setProgressColor(workColor);
        setTimeLeft(formatSeconds(workMinutes * 60));
        setPercentage(0);
    };

    useEffect(() => {
        if (selectedTodo) {
            setCount(selectedTodo.tomatoes);
            handleResetClick();
        }
    }, [selectedTodo]);

    useEffect(() => {
        if (selectedTodo) {
            handleTomatoesPoints(selectedTodo._id, count);
        }
    }, [selectedTodo, count]);

    useEffect(() => {
        const calculatePercentage = () => {
            const initTime = countDownTime * 60;
            const pct = ((initTime - secondsLeft) / initTime) * 100;
            return pct;
        };
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
                setTimeLeft(formatSeconds(secondsLeft));
                setPercentage(calculatePercentage());
                console.log("count: ", count);

                if (secondsLeft === 0) {
                    console.log("ding ding dong!", count);
                    const workCycle = cycle === "work" ? "break" : "work";
                    const countDownTime =
                        workCycle === "work" ? workMinutes : breakMinutes;
                    const progressColor =
                        workCycle === "work" ? workColor : breakColor;
                    const secondsLeft = countDownTime * 60;
                    setCycle(workCycle);
                    setSecondsLeft(secondsLeft);
                    setCountDownTime(countDownTime);
                    setProgressColor(progressColor);
                    setTimeLeft(formatSeconds(secondsLeft));
                    setPercentage(calculatePercentage());

                    if (workCycle === "break") {
                        setCount(count + 1);
                    }
                }

                if (cycle === "work" && secondsLeft === 1) {
                    // const audio = new Audio(
                    //     "http://soundbible.com/grab.php?id=2103&type=wav"
                    // );
                    const audio = new Audio(
                        " http://soundbible.com/grab.php?id=2190&type=mp3"
                    );

                    audio.play();
                }
            }, 1000);
        } else if (!isActive && secondsLeft !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [
        isActive,
        secondsLeft,
        breakColor,
        breakMinutes,
        cycle,
        workColor,
        workMinutes,
        selectedTodo,
        count,
        countDownTime
    ]);

    return (
        <div className="my-container pomodoro-container">
            <div className="pomodoro-inner-container">
                <div className="content-container">
                    <CirularProgressBar
                        color={progressColor}
                        strokeWidth="10"
                        sqSize="500"
                        percentage={percentage}
                        timeLeft={timeLeft}
                    />
                </div>

                <div className="content-container">
                    {selectedTodo ? (
                        <h1>{selectedTodo.title}</h1>
                    ) : (
                        <h1>No task selected</h1>
                    )}
                    {selectedTodo ? (
                        <span>
                            <p>{selectedTodo.description}</p>
                            <p>{selectedTodo.tomatoes}</p>
                            <p>count: {count}</p>
                        </span>
                    ) : (
                        <p>Double click on a task to select it</p>
                    )}
                    <h1
                        className="circle-text"
                        style={{
                            color: progressColor
                        }}
                    >
                        {timeLeft}
                    </h1>

                    <button
                        className="ui red button"
                        onClick={handleStartClick}
                    >
                        <i
                            className={`${isActive ? "pause" : "play"} icon`}
                        ></i>
                        {isActive ? "Pause" : "Play"}
                    </button>
                    <button className="ui button" onClick={handleResetClick}>
                        <i className="sync alternate icon"></i>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainComponent;

//   this.state = {
//     workMinutes: this.props.workMinutes,
//     workColor: this.props.workColor,
//     breakMinutes: this.props.breakMinutes,
//     breakColor: this.props.breakColor,
//     countDownTime: this.props.workMinutes,
//     secondsLeft: this.props.countDownTime * 60,
//     timeLeft: this.formatSeconds(this.props.workMinutes * 60),
//     percentage: 0,
//     hasRun: false,
//     cycle: 'work',
//     progressColor: this.props.workColor
//   };

// const handleInputChange = (id, countDownTime) => {
//     console.log(`App hasRun: ${hasRun}`);
//     const workUpdate = id === "work" ? countDownTime : workMinutes;
//     const breakUpdate = id === "break" ? countDownTime : breakMinutes;
//     console.log(`workUpdate: ${workUpdate}, breakUpdate: ${breakUpdate}`);
//     if (hasRun === false) {
//         setWorkMinutes(workUpdate);
//         setBreakMinutes(breakUpdate);
//         setCountDownTime(workUpdate);
//         setSecondsLeft(workUpdate * 60);
//         setTimeLeft(formatSeconds(workUpdate * 60));
//         setPercentage(0);
//     } else {
//         console.log(
//             `App now running, handle id ${id} input change: ${countDownTime}`
//         );
//         setWorkMinutes(workUpdate);
//         setBreakMinutes(breakUpdate);
//     }
// };

// const handleStartClick = () => {
//     console.log(`Handling startClick`);
//     const countDownTime = cycle === "work" ? workMinutes : breakMinutes;
//     const secondsLeft = countDownTime * 60;
//     setSecondsLeft(secondsLeft);
//     setCountDownTime(countDownTime);

//     let incrementer = setInterval(() => {
//         setSecondsLeft(secondsLeft - 1);
//         setTimeLeft(formatSeconds(secondsLeft));
//         setPercentage(calculatePercentage());

//         if (secondsLeft === -1) {
//             const workCycle = cycle === "work" ? "break" : "work";
//             const countDownTime =
//                 cycle === "work" ? workMinutes : breakMinutes;
//             const progressColor = cycle === "work" ? workColor : breakColor;
//             const secondsLeft = countDownTime * 60;

//             // const audio = new Audio(' http://soundbible.com/grab.php?id=2148&type=mp3');
//             // audio.play();
//             setCycle(workCycle);
//             setSecondsLeft(secondsLeft);
//             setCountDownTime(countDownTime);
//             setProgressColor(progressColor);
//             setTimeLeft(formatSeconds(secondsLeft));
//             setPercentage(calculatePercentage());
//         }
//         console.log(
//             `countDownTime: ${countDownTime}, secondsLeft: ${secondsLeft}, cycle: ${cycle}, timeLeft: ${timeLeft}`
//         );
//         /*
//     }, () => {
//       //clearInterval(incrementer);
//     });
//     */
//     }, 1000);
//     setHasRun(true);
//     setIncrementer(incrementer);
// };

// const defaults = {
//     workMinutes: 25,
//     workColor: "red",
//     breakMinutes: 5,
//     breakColor: "yellow"
// };

/* <div>
    <div>
        <Timer
            key="break"
            name="Break Time (min)"
            color={breakColor}
            time={breakMinutes}
            // id="break"
            // handleInputChange={handleInputChange}
        />
    </div>
    <div>
        <Timer
            key="work"
            name="Work Time (min)"
            color={workColor}
            time={workMinutes}
            // id="work"
            // handleInputChange={handleInputChange}
        />
    </div>
</div>; */
