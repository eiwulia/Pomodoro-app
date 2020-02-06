import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/tomatoe.png";
import Dialog from "../Login/Dialog";

const Header = ({ user, userStateUpdater }) => {
    const [isOpen, setIsOpen] = useState(false);

    const logIn = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const logOut = () => {
        console.log("hej log out!");
        localStorage.removeItem("user");
        userStateUpdater(null);
    };

    return (
        <div className="ui secondary  menu">
            <div className="header item">
                <img className="logo" src={logo} alt="logo" />
                {"  "}
                <Link className="item logo-link" to="/home">
                    {user ? user.userName : null} Pomodoro app
                </Link>
            </div>
            <div className="right menu">
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
