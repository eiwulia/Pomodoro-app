import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Loader from "../Loader";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import UserMessage from "./UserMessage";

const Todos = ({ user, handleSelectedTodo, tomatoePoints, tomatoeTodoId }) => {
    const [todoList, setTodoList] = useState([]);
    const [listUpdater, setListUpdater] = useState({});
    const [status, setStatus] = useState(null);

    const handleUserMessage = status => {
        setStatus(status);
        setTimeout(() => {
            setStatus(null);
        }, 2000);
    };

    const handleListUpdate = (value, action) => {
        setListUpdater(value);
        let updatedList;
        if (action === "delete") {
            console.log("action is delete");
            let deletedTodo = todoList.find(todo => todo._id === value._id);
            updatedList = todoList.filter(todo => todo !== deletedTodo);
            console.log(
                "list before: ",
                todoList,
                "updated list: ",
                updatedList,
                "deleted todo: ",
                deletedTodo
            );
            setTodoList(updatedList);
        } else if (action === "create") {
            console.log("action create");
            updatedList = [...todoList, value];
            console.log(
                "list before: ",
                todoList,
                "updated list: ",
                updatedList,
                "created todo: ",
                value
            );
            setTodoList(updatedList);
        } else if (action === "update") {
            console.log("action update");
            //Find index of specific object using findIndex method.
            let objIndex = todoList.findIndex(obj => obj.id == value.id);
            // console.log("Before update: ", todoList[objIndex]);
            //Update object's name property.
            todoList[objIndex] = value;
        }
    };

    useEffect(() => {
        let url = "/api/getAllTodos";
        fetch(url, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                setTodoList(json.body);
            })
            .catch(error => {
                console.error(
                    "Something went wrong when trying to get all todos",
                    error.message
                );
            });
    }, [listUpdater]);

    let todos;
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

    const onDragEnd = result => {
        console.log("drag end event");
        const { destination, source, draggableId } = result;

        //check if todo has been dropped outside of the container
        //!result.destination
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

        console.log("list is: ", list);

        setTodoList(list);
    };

    const saveOrderToDb = () => {
        console.log("save order to db");
    };

    let todosContent;
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
    } else if (user && todos) {
        todosContent = todos;
    }

    return (
        <div className="my-container">
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
                        {!todos || todos.length === 0 ? (
                            <Loader></Loader>
                        ) : null}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {provided => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {/* {todos} */}
                                        {todosContent}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {/* )} */}
                    </div>
                    <div
                        className={`ui bottom attached button ${
                            user ? "" : "disabled"
                        }`}
                        tabIndex="0"
                        onClick={saveOrderToDb}
                    >
                        Save todo order
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todos;

// FAKE DATA TODOS
// let todos = todoList.map((todo, index) => (
//     <Todo key={index} todo={todo} index={index} user={user} />
// ));

// const todosList = [
//     {
//         id: 1,
//         title: "One todo",
//         description: "kjdgnkdjngkjndkgnkdfjgkdnkg",
//         tomatoes: 1,
//         timestamp: "1 day ago",
//         color: "yellow",
//         userId: 123
//     },
//     {
//         id: 2,
//         title: "Two todo",
//         description: "sdkjns skng ksjdng kjsndgk jnsdkgn ",
//         tomatoes: 2,
//         timestamp: "2 days ago",
//         color: "pink",
//         userId: 123
//     },
//     {
//         id: 3,
//         title: "Three todo",
//         description: "dsjkgn skjgn ksjngk nskjbg skbgksbj",
//         tomatoes: 3,
//         timestamp: "5 days ago",
//         color: "green",
//         userId: 123
//     }
// ];
// const [todoList, setTodoList] = useState(todosList);
