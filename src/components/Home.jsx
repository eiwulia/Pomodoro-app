import React from "react";
import Todos from "./Todos/Todos";
import MainComponent from "./Pomodoro/MainComponent";

const Home = () => {
    return (
        <div className="wrapper">
            <Todos></Todos>
            <MainComponent></MainComponent>
        </div>
    );
};

export default Home;
