import React, { useState, useEffect, useRef } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Loader from "../Loader";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import UserMessage from "./UserMessage";

const Todos = ({ user }) => {
    const [todoList, setTodoList] = useState([]);
    const [addingTodo, setAddingTodo] = useState(false);
    const [listUpdater, setListUpdater] = useState({});
    const [status, setStatus] = useState("");

    const handleUserMessage = status => {
        setStatus(status);
    };

    const handleListUpdate = value => setListUpdater(value);

    const myRef = useRef();
    const handleClickOutside = e => {
        // let buttonText = "Add a todo";
        // || e.target.textContent === buttonText
        if (myRef.current && !myRef.current.contains(e.target)) {
            setAddingTodo(false);
        }
    };

    const handleClickInside = () => setAddingTodo(true);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    });

    useEffect(() => {
        // let start = performance.now();

        let url = "/api/getAllTodos";
        fetch(url, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                // let diff = performance.now() - start;
                // console.log("Got data from API:", json, "It took X ms", diff);
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
        />
    ));

    const isAddingTodo = bool => {
        setAddingTodo(bool);
    };

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

        // console.log("list is: ", list);

        setTodoList(list);
        //send updated list order to mongoDB???
    };

    return (
        <div className="my-container">
            <div className="ui top attached tabular menu">
                <span className={`item active`}>To Do's</span>
            </div>
            <div className="ui bottom attached segment">
                <UserMessage status={status}></UserMessage>
                <div>
                    {!addingTodo ? (
                        <div
                            className="ui top attached vertical animated button"
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
                            <span ref={myRef} onClick={handleClickInside}>
                                <AddTodo
                                    isAddingTodo={isAddingTodo}
                                    handleListUpdate={handleListUpdate}
                                    handleUserMessage={handleUserMessage}
                                />
                            </span>
                        </div>
                    )}
                    <div className="ui attached segment">
                        {!todos || todos.length === 0 ? (
                            <Loader></Loader>
                        ) : (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {provided => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {todos}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todos;

// const [activeTab, setActiveTab] = useState("todos");

/* <span
className={`item ${
    activeTab === "history" ? "active" : ""
}`}
onClick={() => setActiveTab("history")}
>
History
</span> */
// else if (activeTab === "history") {
//     tabContent = <div>No history yet</div>;
// }

// let tabContent;
// if (activeTab === "todos") {
//     tabContent = (
//         <div>
//             {!addingTodo ? (
//                 <div
//                     className="ui top attached vertical animated button"
//                     tabIndex="0"
//                     onClick={() => isAddingTodo(true)}
//                 >
//                     <div className="hidden content">Add a todo</div>
//                     <div className="visible content">
//                         <i className="plus icon"></i>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="ui attached segment">
//                     <span ref={myRef} onClick={handleClickInside}>
//                         <AddTodo
//                             isAddingTodo={isAddingTodo}
//                             handleListUpdate={handleListUpdate}
//                         />
//                     </span>
//                 </div>
//             )}
//             <div className="ui attached segment">
//                 <div>{todos}</div>
//             </div>
//         </div>
//     );
// }

// FAKE DATA TODOS
// let todos = todoList.map((todo, index) => (
//     <Todo key={index} todo={todo} index={index} user={user} />
// ));

// const todosList = [
//     {
//         id: 1,
//         title: "One todo",
//         description: "kjdgnkdjngkjndkgnkdfjgkdnkg",
//         tomatoes: 0,
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
//         tomatoes: 5,
//         timestamp: "5 days ago",
//         color: "green",
//         userId: 123
//     }
// ];
