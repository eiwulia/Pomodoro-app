import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Loader from "../Loader";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import UserMessage from "./UserMessage";

const Todos = ({
    user,
    handleSelectedTodo,
    tomatoePoints,
    tomatoeTodoId,
    handleTotalTomatoePoints,
    totalTomPoints
}) => {
    const [todoList, setTodoList] = useState([]);
    const [status, setStatus] = useState(null);
    const [todoUpdater, setTodoUpdater] = useState({});

    const handleUserMessage = status => {
        setStatus(status);
        setTimeout(() => {
            setStatus(null);
        }, 2000);
    };

    const handleListUpdate = (value, action) => {
        setTodoUpdater(value);
        let updatedList;
        if (action === "delete") {
            let deletedTodo = todoList.find(todo => todo._id === value._id);
            updatedList = todoList.filter(todo => todo !== deletedTodo);
            setTodoList(updatedList);
        } else if (action === "create") {
            updatedList = [...todoList, value];
            setTodoList(updatedList);
        } else if (action === "update") {
            let objIndex = todoList.findIndex(obj => obj.id === value.id);
            todoList[objIndex] = value;
        } else if (action === "tomatoes") {
            let objIndex = todoList.findIndex(obj => obj.id === value.id);
            todoList[objIndex] = value;
        }
    };

    let todos;
    if (todoList) {
        todos = todoList.map((todo, index) => (
            <Todo
                key={index}
                handleListUpdate={handleListUpdate}
                todo={todo}
                index={index}
                user={user}
                handleUserMessage={handleUserMessage}
                handleSelectedTodo={handleSelectedTodo}
                tomatoePoints={tomatoePoints}
                tomatoeTodoId={tomatoeTodoId}
            />
        ));
    }

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        //check if todo has been dropped outside of the container
        if (!destination) {
            return;
        }
        //check if location is the same
        if (
            destination.draggableId === source.draggableId &&
            destination.index === source.index
        ) {
            return;
        }
        //reorder todos
        let list = Array.from(todoList);
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);

        setTodoList(list);
    };

    const UpdateTodoOrder = (user, list) => {
        fetch(`/api/updateTodoOrder/${user.userId}`, {
            method: "PUT",
            body: JSON.stringify(list),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            res => {
                console.log(
                    "order updated! ",
                    list,
                    "Res.status: ",
                    res.status
                );
            },
            error => {
                console.log("Error while updating todo order: ", error);
                handleUserMessage("failure");
            }
        );
    };

    const saveTodoOrderToDb = () => {
        if (user && todoList) {
            UpdateTodoOrder(user, todoList);
        }
    };

    let todosContent = "";
    if (!user) {
        todosContent = (
            <div className="todo-centered-content">
                <h3> Hej!</h3>
                <p>Log in now to start using pomodoro app!</p>
            </div>
        );
    } else if (user && !todos) {
        todosContent = (
            <div className="todo-centered-content">
                <h3>Hi {user.userName}!</h3>
                <p>
                    Start working on your goals by creating a todo. All you need
                    to do is click on a plus button above and add a new task!
                </p>
            </div>
        );
    } else if (user && todos.length !== 0) {
        todosContent = todos;
    }

    const GetUserTodos = userFromLocalStorage => {
        let url = `/api/getUser/${userFromLocalStorage.userId}`;
        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                // console.log("User todos (db): ", json.body.todos);
                setTodoList(json.body.todos);
                handleTotalTomatoePoints(json.body.totalTomatoes);
                totalTomPoints(json.body.totalTomatoes);
            })
            .catch(error => {
                console.error(
                    "Something went wrong when trying to get user",
                    error.message
                );
            });
    };

    useEffect(() => {
        if (user) {
            GetUserTodos(user);
        }
    }, [user]);

    // const getListStyle = isDraggingOver => ({
    //     background: isDraggingOver ? "lightblue" : ""
    // });

    return (
        <div className="my-container todo-container">
            <div className="ui top attached tabular menu">
                <span className={`item active`}>To Do's</span>
            </div>
            <div className="ui bottom attached segment">
                {status ? <UserMessage status={status}></UserMessage> : null}
                <div>
                    <AddTodo
                        handleListUpdate={handleListUpdate}
                        handleUserMessage={handleUserMessage}
                        user={user}
                    />
                    <div className="ui attached segment">
                        {todosContent.length === 0 ? <Loader></Loader> : null}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        // style={getListStyle(
                                        //     snapshot.isDraggingOver
                                        // )}
                                    >
                                        {todosContent}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div
                        className={`ui bottom attached button ${
                            user ? "" : "disabled"
                        }`}
                        tabIndex="0"
                        onClick={saveTodoOrderToDb}
                    >
                        Save todo order
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todos;
