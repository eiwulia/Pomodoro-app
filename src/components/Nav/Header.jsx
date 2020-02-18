import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/tomatoe.png";
import Dialog from "../Login/Dialog";

const Header = ({ user, userStateUpdater, tomPoints }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);

    const logIn = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const logOut = () => {
        localStorage.removeItem("user");
        userStateUpdater(null);
        setTotalPoints(0);
    };

    useEffect(() => {
        if (user) {
            setTotalPoints(tomPoints);
        }
    }, [user, tomPoints]);

    return (
        <div className="ui secondary menu">
            <span className="item">
                <img className="logo" src={logo} alt="logo" />
                <Link className="item logo-link user-name-logo" to="/home">
                    <span className="user-name-logo">
                        {user ? user.userName : null}
                        &nbsp;&nbsp; Pomodoro app
                    </span>
                </Link>
            </span>

            <div className="right menu">
                <div className="ui labeled button item">
                    <div className="ui black button">
                        Total &nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="tomatoe-icon icon"></i>
                    </div>
                    <a className="ui basic black label item" href="/contact">
                        {totalPoints}
                    </a>
                </div>

                <Link className="ui item" to="/home">
                    Home
                </Link>
                {!user ? (
                    <Link
                        className="ui active item"
                        to="/login"
                        onClick={logIn}
                    >
                        Login
                    </Link>
                ) : (
                    <Link
                        className="ui active item"
                        to="/logout"
                        onClick={logOut}
                    >
                        Logout
                    </Link>
                )}
                <Dialog isOpen={isOpen} closeDialog={closeDialog}></Dialog>
            </div>
        </div>
    );
};

export default Header;
