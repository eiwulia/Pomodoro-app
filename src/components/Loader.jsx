import React from "react";

const Loader = () => {
    return (
        <div className="wrapper">
            <div className="lds-roller">
                Loading todos...
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
