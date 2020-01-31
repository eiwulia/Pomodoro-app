import React from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TodoOptionsDropdown from "./TodoOptionsDropdown";
import EditTodoModal from "./EditTodoModal";
const moment = require("moment");

const Todo = ({ todo, handleListUpdate, index, user, handleUserMessage }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = bool => setIsEditing(bool);

    let todoTime = "2020-01-17T16:42:13.240Z";

    const daysAgo = todoTimestamp => {
        let start = moment(todo.timestamp);
        // let start = moment(todoTimestamp);
        let end = moment(new Date());
        let momentDayDiference = end.to(start); // ".. days ago"

        return momentDayDiference;
    };

    let userName;
    if (user) {
        userName = user.userName;
        console.log("user name: ", userName);
    } else {
        console.log("no user name...");
    }

    return (
        <div>
            <Draggable draggableId={`${todo.id}`} index={index} key={todo.id}>
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
                                {user ? (
                                    <div>HEJ user exists</div>
                                ) : (
                                    <div>No user</div>
                                )}
                            </div>
                            <div className="extra content">
                                <i className="trophy icon"></i>
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
