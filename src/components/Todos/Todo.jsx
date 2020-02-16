import React from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TodoOptionsDropdown from "./TodoOptionsDropdown";
import EditTodoModal from "./EditTodoModal";
import { useEffect } from "react";
const moment = require("moment");

const Todo = ({
    user,
    todo,
    handleListUpdate,
    index,
    handleUserMessage,
    handleSelectedTodo,
    tomatoePoints,
    tomatoeTodoId
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tomatoes, setTomatoes] = useState(todo.tomatoes);

    const UpdateTomatoePoints = (user, todo, points) => {
        let todoUpdater = {
            todo: { todo },
            tomatoePoints: points
        };
        fetch(`/api/updateTodoTomatoePoints/${user.userId}`, {
            method: "PUT",
            body: JSON.stringify(todoUpdater),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            res => {
                console.log("Update todo tomatoe points: ", res.status);
            },
            error => {
                console.log("Error while updating todo tomatoes: ", error);
                handleUserMessage("failure");
            }
        );
    };

    useEffect(() => {
        if (todo.id === tomatoeTodoId && tomatoePoints) {
            setTomatoes(tomatoePoints);
            let newTodoInfo = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                color: todo.color,
                tomatoes: tomatoePoints,
                timestamp: todo.timestamp
            };
            handleListUpdate(newTodoInfo, "tomatoes");
            if (user) {
                UpdateTomatoePoints(user, todo, tomatoePoints);
            }
        }
    }, [tomatoePoints, todo.id, tomatoeTodoId]);

    const handleEditClick = bool => setIsEditing(bool);

    let todoTime = "2020-01-17T16:42:13.240Z";

    const daysAgo = () => {
        let start = moment(todo.timestamp);
        let end = moment(new Date());
        let momentDayDiference = end.to(start);

        return momentDayDiference;
    };

    const handleDoubleClick = e => {
        console.log("double click", todo);
        handleSelectedTodo(todo);
    };

    // const getItemStyle = (isDragging, draggableStyle) => ({
    //     background: isDragging ? "lightgreen" : "",
    //     ...draggableStyle
    // });

    return (
        <div onDoubleClick={e => handleDoubleClick(e)}>
            <Draggable draggableId={`${todo.id}`} index={index} key={todo.id}>
                {(provided, snapshot) => (
                    <div
                        className="ui cards"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //     snapshot.isDragging,
                        //     provided.draggableProps.style
                        // )}
                    >
                        <div className={`card ${todo.color}`}>
                            <div className="content">
                                <TodoOptionsDropdown
                                    todo={todo}
                                    user={user}
                                    handleListUpdate={handleListUpdate}
                                    handleEditClick={handleEditClick}
                                    handleUserMessage={handleUserMessage}
                                />
                                {isEditing ? (
                                    <EditTodoModal
                                        todo={todo}
                                        user={user}
                                        handleEditClick={handleEditClick}
                                        handleListUpdate={handleListUpdate}
                                        handleUserMessage={handleUserMessage}
                                    ></EditTodoModal>
                                ) : null}
                                <div className="center aligned header">
                                    {todo.title}
                                </div>
                                <div className="center aligned meta">
                                    created {daysAgo(todoTime)}
                                </div>
                                <div className="center aligned description">
                                    {todo.description}
                                </div>
                            </div>
                            <div className="extra content">
                                <i className="tomatoe-icon icon"></i>
                                {todo.tomatoes} tomatoes
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default Todo;
