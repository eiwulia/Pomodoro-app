const express = require("express");
const server = express();
const db = require("./server/mongo");

const path = require("path");
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const passport = require("passport");
require("./config/passport");
server.use(passport.initialize());

// in build version....
server.use(express.static(path.join(__dirname, "build")));

server.get("/test", (req, res) => {
    var list = ["test1", "test2", "test3"];
    res.json(list);
    console.log("Sent list of tests");
});

// server.get("/*", function(req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//index routes
server.use("/", require("./routes/index"));
//user routes
server.use("/auth", require("./routes/user"));

server.get("/api/getUser/:id", (request, response) => {
    console.log("Received GET request to: ", request.url);
    let id = request.params.id;
    db.getUser(id, res => {
        response.send({
            status: 200,
            body: res
        });
    });
});

server.put("/api/addTodoToList/:id", (request, response) => {
    let id = request.params.id;
    let todo = request.body;

    db.addTodoToList(id, todo, res => {
        console.log("server side. New todo: ", todo);
        response.send({
            status: 200,
            body: res
        });
    });
});

server.put("/api/updateTodoInList/:id", (request, response) => {
    let id = request.params.id;
    let newTodo = request.body;

    db.updateTodoInList(id, newTodo, res => {
        console.log("server side. Updated todo: ", newTodo);
        response.send({
            status: 200,
            body: res
        });
    });
});

server.put("/api/deleteTodoFromList/:id", (request, response) => {
    let userId = request.params.id;
    let todoId = request.body.id;
    // console.log("server user id: ", userId, "server todoId", todoId);

    db.deleteTodoFromList(userId, todoId, res => {
        console.log("server side. Todo id to delete: ", todoId);
        response.send({
            status: 200,
            body: res
        });
    });
});

server.put("/api/updateTodoOrder/:id", (request, response) => {
    let userId = request.params.id;
    let todoList = request.body;
    console.log("server user id: ", userId, "todo list", todoList);

    db.updateTodoOrder(userId, todoList, res => {
        console.log("server side. Todo order is updated! ", todoList);
        response.send({
            status: 200,
            body: res
        });
    });
});

server.put("/api/updateTodoTomatoePoints/:id", (request, response) => {
    let userId = request.params.id;
    let todo = request.body.todo.todo;
    let tomatoePoints = request.body.tomatoePoints;
    console.log(
        "server user id: ",
        userId,
        "todo: ",
        todo,
        "tomatoePoints: ",
        tomatoePoints
    );

    db.updateTodoTomatoePoints(userId, todo, tomatoePoints, res => {
        console.log("server side. Todo tomatoe points updated! ", todo);
        response.send({
            status: 200,
            body: res
        });
    });
});

server.put("/api/updateTotalTomatoePoints/:id", (request, response) => {
    let userId = request.params.id;
    let points = request.body.points;
    console.log("server user id: ", userId, "total points", points);

    db.updateTotalTomatoePoints(userId, points, res => {
        console.log("Server side. Total points are updated! ", points);
        response.send({
            status: 200,
            body: res
        });
    });
});

const port = process.env.PORT || 4000;

server.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);

// server.use(express.static("client/build"));

///to kill all serices in cmd: taskkill /F /IM node.exe
