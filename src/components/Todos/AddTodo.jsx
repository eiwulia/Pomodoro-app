import React, { useState } from "react";
import ColorDropdown from "./ColorDropdown";
const uuidv4 = require("uuid/v4");

const AddTodo = ({ isAddingTodo, handleListUpdate, handleUserMessage }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("pink");

    async function AddNewTodo(todo) {
        let newTodo = {
            ...todo,
            timestamp: new Date(),
            id: uuidv4()
        };
        // console.log("new todo will be: ", newTodo);
        const serverResponse = await fetch("/api/postNewTodo", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const res = await serverResponse.json();
        if (res.status === 200) {
            handleUserMessage("success");
        }
        console.log("Todo created successfuly! Response status: ", res.status);
        // if () {
        //     console.log("error. Could not add a todo");
        //     handleUserMessage("failure");
        // }
    }

    const handleSubmit = e => {
        isAddingTodo(false);
        e.preventDefault();
        console.log(
            `title: ${title}, description: ${description}, color: ${color}`
        );
        let todo = {
            title,
            description,
            color
        };
        AddNewTodo(todo);
        handleListUpdate(todo);
    };

    const chooseColor = color => {
        setColor(color);
    };

    return (
        <div>
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <form className="ui form">
                            <div className="field">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Todo title..."
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Description</label>
                                <textarea
                                    rows="2"
                                    placeholder="Todo description..."
                                    onChange={e =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div className="field">
                                <ColorDropdown
                                    chooseColor={chooseColor}
                                ></ColorDropdown>
                            </div>
                            <button
                                className="ui green button"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Add a todo
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
