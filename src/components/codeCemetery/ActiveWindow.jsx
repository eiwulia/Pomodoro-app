import React from "react";
import Circle from "./Circle";

const ActiveWindow = () => {
    return (
        <div className="my-container pomodoro-container">
            <div className="pomodoro-inner-container">
                <Circle></Circle>
                <div className="content-container">
                    <h1>Todo title</h1>
                    <p>
                        Todo description that is not short, but not very long
                        either. Lagom
                    </p>

                    <h1>15:30</h1>

                    <button className="ui red button">
                        <i className="play pause icon"></i>
                        <i className="pause icon"></i>
                        Play
                    </button>
                    <button className="ui button">
                        <i className="sync alternate icon"></i>
                        Refresh
                    </button>
                </div>

                {/* <div className="ui red tiny progress">
                    <div className="bar"></div>
                    <div className="label">Tiny progress bar</div>
                </div> */}
            </div>
        </div>
    );
};

export default ActiveWindow;
