import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import queryString from "query-string";

import Header from "./components/Nav/Header";
import ContentRouting from "./components/ContentRouting";
import Footer from "./components/Nav/footer/Footer";

import "./styles/styles.css";

const App = () => {
    const [user, setUser] = useState(null);
    const [tomPoints, setTomPoints] = useState(0);

    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        //check first if user is saved in local storage
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser(user);
        }

        // SAVE USER TO LOCALSTORAGE IF THERES A QUERY
        const query = queryString.parse(location.search);

        if (query && query.user && query.email) {
            console.log("creating user");
            let user = {
                userEmail: query.email,
                userId: query.user,
                userName: query.name
            };
            window.localStorage.setItem("user", JSON.stringify(user));
            history.push("/");
        }
    }, [history, location.search]);

    const userStateUpdater = updater => {
        setUser(updater);
    };

    const totalTomPoints = points => {
        setTomPoints(points);
    };

    return (
        <div>
            <Router>
                <Header
                    user={user}
                    userStateUpdater={userStateUpdater}
                    tomPoints={tomPoints}
                />
                <main>
                    <ContentRouting
                        user={user}
                        totalTomPoints={totalTomPoints}
                    ></ContentRouting>
                </main>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
