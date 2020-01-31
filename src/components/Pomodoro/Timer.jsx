import React from "react";

const Timer = ({ color, name, time }) => {
    // const [numVal, setNumVal] = useState(0);

    // const propagateStateChange = time => {
    //     setNumVal(time);

    //     console.log(`Number Spinner ID '${id}' Updated NumVal: ${numVal}`);
    //     handleInputChange(id, numVal);
    // };

    // const handleDownClick = () => {
    //     if (numVal - 1 >= 1) {
    //         propagateStateChange(numVal - 1);
    //     }
    // };

    // const handleUpClick = () => {
    //     if (numVal + 1 <= 60) {
    //         propagateStateChange(numVal + 1);
    //     }
    // };

    return (
        <div>
            <h3 style={{ color: color }}>{name}</h3>
            <span>{time}</span>
            {/* <div className="input-group number-spinner">
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        onClick={handleDownClick}
                    >
                        <span className="glyphicon glyphicon-minus"></span>
                    </button>
                </span>
                <input type="text" className="form-control" value={time} />
                <span className="input-group-btn">
                    <button className="btn btn-default" onClick={handleUpClick}>
                        <i className="glyphicon glyphicon-plus"></i>
                    </button>
                </span>
            </div> */}
        </div>
    );
};

export default Timer;
