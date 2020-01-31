import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/tomatoe.png";
import Dialog from "../Login/Dialog";

const Header = ({ user, userStateUpdater }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [userHeader, setUserHeader] = useState(null);

    // useEffect(() => {
    //     // local storage
    //     const userHeader = JSON.parse(localStorage.getItem("user"));
    //     console.log("header user?, ", userHeader);
    //     if (userHeader) {
    //         console.log("user header: ", userHeader);
    //         setUserHeader(userHeader);
    //     }
    // }, []);

    const logIn = e => {
        setIsOpen(true);
    };

    const closeDialog = e => {
        setIsOpen(false);
    };

    const logOut = e => {
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
                    {" "}
                    Pomodoro app
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
