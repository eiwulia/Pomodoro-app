import React, { useState } from "react";
import CircleProgressBar from "./CircleProgressBar";

const Circle = () => {
    const [percentage, setPercentage] = useState(0);

    const handleChangeEvent = event => setPercentage(event.target.value);

    return (
        <div>
            <CircleProgressBar
                strokeWidth="10"
                sqSize="200"
                percentage={percentage}
            />
            <div>
                <input
                    id="progressInput"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={percentage}
                    onChange={e => handleChangeEvent(e)}
                />
            </div>
        </div>
    );
};

export default Circle;
