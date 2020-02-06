import React, { useState, useEffect, useRef } from "react";
import ColorDropdown from "./ColorDropdown";
// const uuidv4 = require("uuid/v4");

const AddTodo = ({ handleListUpdate, handleUserMessage, user }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("pink");
    const [addingTodo, setAddingTodo] = useState(false);

    async function AddNewTodo(todo) {
        let newTodo = {
            ...todo,
            timestamp: new Date(),
            tomatoes: 0
            // id: uuidv4()
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
        } else {
            console.log("error. Could not add a todo");
            handleUserMessage("failure");
        }
        console.log("Todo created successfuly! Response status: ", res.status);
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

    const myRef = useRef();
    const handleClickOutside = e => {
        if (myRef.current && !myRef.current.contains(e.target)) {
            setAddingTodo(false);
        }
    };

    const handleClickInside = e => {
        let buttonText = "Add a todo";
        if (e.target.textContent !== buttonText) {
            setAddingTodo(true);
        }
    };

    const isAddingTodo = bool => {
        setAddingTodo(bool);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    });

    return (
        <div>
            {!addingTodo ? (
                <div
                    className={`ui top attached vertical animated button ${
                        user ? "" : "disabled"
                    }`}
                    tabIndex="0"
                    onClick={() => isAddingTodo(true)}
                >
                    <div className="hidden content">Add a todo</div>
                    <div className="visible content">
                        <i className="plus icon"></i>
                    </div>
                </div>
            ) : (
                <div className="ui attached segment">
                    <span ref={myRef} onClick={e => handleClickInside(e)}>
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
                                                onChange={e =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Description</label>
                                            <textarea
                                                rows="2"
                                                placeholder="Todo description..."
                                                onChange={e =>
                                                    setDescription(
                                                        e.target.value
                                                    )
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
                    </span>
                </div>
            )}
        </div>
    );
};

export default AddTodo;
