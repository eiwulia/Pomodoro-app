import React from "react";

const CircleProgressBar = ({ percentage }) => {
    //to be exchanged with props
    const defaults = {
        sqSize: 600,
        percentage: 0,
        strokeWidth: 10,
        color: "pink"
    };

    // Size of the enclosing square
    const sqSize = defaults.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (defaults.sqSize - defaults.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    return (
        <svg width={defaults.sqSize} height={defaults.sqSize} viewBox={viewBox}>
            <circle
                className="circle-background"
                cx={defaults.sqSize / 2}
                cy={defaults.sqSize / 2}
                r={radius}
                strokeWidth={`${defaults.strokeWidth}px`}
            />
            <circle
                className="circle-progress"
                cx={defaults.sqSize / 2}
                cy={defaults.sqSize / 2}
                r={radius}
                strokeWidth={`${defaults.strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(-90 ${defaults.sqSize /
                    2} ${defaults.sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                    stroke: defaults.color
                }}
            />
            <text
                className="circle-text"
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
                style={{
                    fill: defaults.color
                }}
            >
                {`${percentage}%`}
                {/* {`${this.props.timeLeft}`} */}
            </text>
        </svg>
    );
};

export default CircleProgressBar;
