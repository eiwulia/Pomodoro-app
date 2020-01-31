import React from "react";
import Login from "./Login";
import logo from "../../assets/tomatoe.png";

const Dialog = ({ isOpen, closeDialog }) => {
    let dialog = (
        <div className="dialogBackground" onClick={closeDialog}>
            <div className="dialogWindow">
                <button className="dialogExitButton" onClick={closeDialog}>
                    X
                </button>
                <h2 className="ui image header">
                    <img className="image" src={logo} alt="logo"></img>
                    <div>Log-in to your account</div>
                </h2>
                <Login></Login>
            </div>
        </div>
    );

    if (!isOpen) {
        dialog = null;
    }

    return <div>{dialog}</div>;
};

export default Dialog;
