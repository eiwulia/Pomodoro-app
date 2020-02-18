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

    const [workMinutes] = useState(25);
    const [workColor] = useState("red");
    const [breakMinutes] = useState(5);
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
        setIsActive(!isActive);
    };

    const handleResetClick = () => {
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

                if (secondsLeft === 0) {
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

                    if (workCycle === "break" && selectedTodo) {
                        let points = count + 1;
                        setCount(points);
                        handleTomatoesPoints(selectedTodo.id, points);
                    }
                }

                if (cycle === "work" && secondsLeft === 1) {
                    const audio = new Audio(
                        "http://soundbible.com/grab.php?id=2218&type=wav"
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

                <div className="content-container content-info">
                    {selectedTodo ? (
                        <h1>{selectedTodo.title}</h1>
                    ) : (
                        <h1>No task selected</h1>
                    )}
                    {selectedTodo ? (
                        <span>
                            <p>{selectedTodo.description}</p>
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
                    <span className="circle-buttons">
                        <button
                            className="ui red button"
                            onClick={handleStartClick}
                        >
                            <i
                                className={`${
                                    isActive ? "pause" : "play"
                                } icon`}
                            ></i>
                            {isActive ? "Pause" : "Play"}
                        </button>
                        <button
                            className="ui button"
                            onClick={handleResetClick}
                        >
                            <i className="sync alternate icon"></i>
                            Reset
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
