import React from "react";
import { Dropdown } from "semantic-ui-react";

const TodoOptionsDropdown = ({
    todo,
    handleListUpdate,
    handleEditClick,
    handleUserMessage
}) => {
    const DeleteTodo = todoId => {
        handleListUpdate(todo, "delete");
        fetch(`/api/deleteTodo/${todoId}`, {
            method: "DELETE",
            body: JSON.stringify(todoId)
        })
            .then(res => {
                res.json();
                // if (res.status === 200) {
                //     handleUserMessage("success");
                // }
            })
            .then(
                result => {
                    console.log("todo deleted!", todo);
                },
                error => {
                    console.log("Error while deleting todo: ", error);
                    handleUserMessage("failure");
                }
            );
    };

    return (
        <Dropdown
            icon="ellipsis vertical"
            floating
            button
            className="right floated circular icon "
        >
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEditClick(true)}>
                    Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => DeleteTodo(todo._id)}>
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default TodoOptionsDropdown;
