const express = require("express");
const server = express();
const db = require("./server/mongo");
const { performance } = require("perf_hooks");
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

server.post("/api/postNewTodo", (request, response) => {
    console.log(
        "Received POST request to /api/postNewTodo",
        request.url,
        "req.body: ",
        request.body
    );
    db.addTodo(request.body, res => {
        response.send({
            status: 200
        });
    });
});

server.get("/api/getAllTodos", (request, response) => {
    let start = performance.now();
    console.log("Received GET request to: ", request.url);
    db.getTodos(res => {
        let diff = performance.now() - start;
        console.log("time dif: ", diff);
        response.send({
            status: 200,
            body: res
        });
    });
});

server.delete("/api/deleteTodo/:id", (request, response) => {
    console.log("Received DELETE request to: ", request.url);
    let id = request.params.id;
    console.log(id);
    db.deleteTodo(id, res => {
        response.send(JSON.stringify(res));
    });
});

server.put("/api/updateTodo/:id", (request, response) => {
    console.log(
        "Received PUT request to: ",
        request.url,
        "with req.body: ",
        request.body
    );

    db.updateTodo(request.body, res => {
        response.send({
            status: 200,
            body: res
        });
    });
});

// const port = process.env.PORT || 4000;

const port = 4000;
server.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);

// server.use(express.static("client/build"));

///to kill all serices in cmd: taskkill /F /IM node.exe
