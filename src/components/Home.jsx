import React, { useState } from "react";
import Todos from "./Todos/Todos";
import MainComponent from "./Pomodoro/MainComponent";

const Home = ({ user }) => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [tomatoePoints, setTomatoePoints] = useState(0);
    const [tomatoeTodoId, setTomatoeTodoId] = useState(null);

    const handleSelectedTodo = todo => {
        setSelectedTodo(todo);
    };

    const handleTomatoesPoints = (id, tomatoes) => {
        setTomatoeTodoId(id);
        setTomatoePoints(tomatoes);
    };

    console.log("tomatoePoints: ", tomatoePoints);

    return (
        <div className="wrapper">
            <Todos
                user={user}
                handleSelectedTodo={handleSelectedTodo}
                tomatoePoints={tomatoePoints}
                tomatoeTodoId={tomatoeTodoId}
            ></Todos>
            <MainComponent
                user={user}
                selectedTodo={selectedTodo}
                handleTomatoesPoints={handleTomatoesPoints}
            ></MainComponent>
        </div>
    );
};

export default Home;
