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

    useEffect(() => {
        if (todo._id === tomatoeTodoId && tomatoePoints) {
            setTomatoes(tomatoePoints);
        }
    }, [tomatoePoints, todo._id, tomatoeTodoId]);

    const handleEditClick = bool => setIsEditing(bool);

    let todoTime = "2020-01-17T16:42:13.240Z";

    const daysAgo = todoTimestamp => {
        let start = moment(todo.timestamp);
        // let start = moment(todoTimestamp);
        let end = moment(new Date());
        let momentDayDiference = end.to(start); // ".. days ago"

        return momentDayDiference;
    };

    const handleDoubleClick = e => {
        console.log("double click", todo);
        handleSelectedTodo(todo);
    };

    return (
        <div onDoubleClick={e => handleDoubleClick(e)}>
            <Draggable draggableId={`${todo._id}`} index={index} key={todo._id}>
                {(provided, snapshot) => (
                    <div
                        className="ui cards"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className={`card ${todo.color}`}>
                            <div className="content">
                                <TodoOptionsDropdown
                                    todo={todo}
                                    handleListUpdate={handleListUpdate}
                                    handleEditClick={handleEditClick}
                                    handleUserMessage={handleUserMessage}
                                />
                                {isEditing ? (
                                    <EditTodoModal
                                        todo={todo}
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
                                {tomatoes} tomatoes
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default Todo;
