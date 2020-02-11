import React, { useState, useEffect, useRef } from "react";
import ColorDropdown from "./ColorDropdown";
const uuidv4 = require("uuid/v4");

const AddTodo = ({ handleListUpdate, handleUserMessage, user }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("pink");
    const [addingTodo, setAddingTodo] = useState(false);

    const addTodoToList = (user, todo) => {
        fetch(`/api/addTodoToList/${user.userId}`, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            res => {
                console.log("Added todo! ", todo, "Res.status: ", res.status);
            },
            error => {
                console.log(
                    "Error while adding todo to user todos list: ",
                    error
                );
                handleUserMessage("failure");
            }
        );
    };

    const handleSubmit = e => {
        isAddingTodo(false);
        e.preventDefault();
        console.log(
            `title: ${title}, description: ${description}, color: ${color}`
        );
        let todo = {
            id: uuidv4(),
            title,
            description,
            color,
            tomatoes: 0,
            timestamp: new Date()
        };
        handleListUpdate(todo, "create");
        if (user) {
            addTodoToList(user, todo);
        }
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
