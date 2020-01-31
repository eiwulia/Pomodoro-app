import React, { useState } from "react";
import logo from "../../assets/tomatoe.png";
import ColorDropdown from "./ColorDropdown";

const EditTodoModal = ({
    todo,
    handleEditClick,
    handleListUpdate,
    handleUserMessage
}) => {
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDescription, setNewDescription] = useState(todo.description);
    const [newColor, setNewColor] = useState("green");

    const UpdateTodo = todo => {
        let newTodoInfo = {
            id: todo._id,
            title: newTitle,
            description: newDescription,
            color: newColor
        };
        // console.log(newTodoInfo, "without server involved");
        fetch(`/api/updateTodo/${todo._id}`, {
            method: "PUT",
            body: JSON.stringify(newTodoInfo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => {
                res.json();
                if (res.status === 200) {
                    handleUserMessage("success");
                }
            })
            .then(
                res => {
                    console.log("todo updated!", "with todo: ", newTodoInfo);
                    // handleListUpdate(newTodoInfo);
                },
                error => {
                    console.log("Error while updating todo: ", error);
                    handleUserMessage("failure");
                }
            );
    };

    const handleUpdateSubmit = e => {
        e.preventDefault();
        let newTodoInfo = {
            id: todo._id,
            title: newTitle,
            description: newDescription,
            color: newColor
        };
        UpdateTodo(todo);
        handleEditClick(false);
        handleListUpdate(newTodoInfo);
    };

    const pickNewColor = col => {
        setNewColor(col);
    };

    return (
        <div className="dialogBackground">
            <div className="dialogWindow">
                <button
                    className="dialogExitButton"
                    onClick={() => handleEditClick(false)}
                >
                    X
                </button>
                <h2 className="ui image header">
                    <img className="image" src={logo} alt="logo"></img>
                    <div>Edit todo</div>
                </h2>

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
                                        defaultValue={todo.title}
                                        onChange={e =>
                                            setNewTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Todo description..."
                                        defaultValue={todo.description}
                                        onChange={e =>
                                            setNewDescription(e.target.value)
                                        }
                                    ></textarea>
                                </div>

                                <div className="field">
                                    <ColorDropdown
                                        usedTodoColor={todo.color}
                                        pickNewColor={pickNewColor}
                                    />
                                </div>
                                <button
                                    className="ui green button"
                                    type="submit"
                                    onClick={e => handleUpdateSubmit(e)}
                                >
                                    Submit changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTodoModal;
