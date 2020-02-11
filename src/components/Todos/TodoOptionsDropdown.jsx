import React from "react";
import { Dropdown } from "semantic-ui-react";

const TodoOptionsDropdown = ({
    todo,
    user,
    handleListUpdate,
    handleEditClick,
    handleUserMessage
}) => {
    const DeleteTodo = (user, todo) => {
        fetch(`/api/deleteTodoFromList/${user.userId}`, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            res => {
                console.log("todo deleted!", todo, "Res.status: ", res.status);
            },
            error => {
                console.log("Error while deleting todo: ", error);
                handleUserMessage("failure");
            }
        );
    };

    const handleDeleteClick = todo => {
        handleListUpdate(todo, "delete");
        if (user) {
            DeleteTodo(user, todo);
        }
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
                <Dropdown.Item onClick={() => handleDeleteClick(todo)}>
                    Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default TodoOptionsDropdown;
