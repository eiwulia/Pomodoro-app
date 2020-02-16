import React from "react";

const Timer = ({ color, name, time }) => {
    return (
        <div>
            <h3 style={{ color: color }}>{name}</h3>
            <span>{time}</span>
        </div>
    );
};

export default Timer;
