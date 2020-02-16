import React, { useState } from "react";
import Todos from "./Todos/Todos";
import MainComponent from "./Pomodoro/MainComponent";

const Home = ({ user, totalTomPoints }) => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [tomatoePoints, setTomatoePoints] = useState(0);
    const [tomatoeTodoId, setTomatoeTodoId] = useState(null);
    const [totalTomatoes, setTotalTomatoes] = useState(0);

    const UpdateTotalTomatoePoints = (user, points) => {
        let obj = { points: String(points) };

        fetch(`/api/updateTotalTomatoePoints/${user.userId}`, {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            res => {
                console.log("Total points updated! Res.status: ", res.status);
            },
            error => {
                console.log("Error while updating total points: ", error);
            }
        );
    };

    const handleSelectedTodo = todo => {
        setSelectedTodo(todo);
    };

    const handleTomatoesPoints = (id, tomatoes) => {
        setTomatoeTodoId(id);
        setTomatoePoints(tomatoes);
        setTotalTomatoes(Number(totalTomatoes) + 1);
        let points = Number(totalTomatoes) + 1;
        if (user) {
            UpdateTotalTomatoePoints(user, points);
            totalTomPoints(points);
        }
    };

    const handleTotalTomatoePoints = totalTomatoes => {
        setTotalTomatoes(totalTomatoes);
    };

    return (
        <div className="wrapper">
            {/* <div>Total tomatoe points: {totalTomatoes}</div> */}
            <Todos
                user={user}
                handleSelectedTodo={handleSelectedTodo}
                tomatoePoints={tomatoePoints}
                tomatoeTodoId={tomatoeTodoId}
                handleTotalTomatoePoints={handleTotalTomatoePoints}
                totalTomPoints={totalTomPoints}
            ></Todos>
            <h4 className="ui horizontal divider header pomodoro-divider">
                <i className="tomatoe-icon icon"></i>
            </h4>
            <MainComponent
                user={user}
                selectedTodo={selectedTodo}
                handleTomatoesPoints={handleTomatoesPoints}
            ></MainComponent>
        </div>
    );
};

export default Home;
