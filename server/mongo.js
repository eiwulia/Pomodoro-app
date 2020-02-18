const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const settings = { useNewUrlParser: true, useUnifiedTopology: true };
// const url = "mongodb://localhost:27017";
const url = process.env.MONGO_URL;

const addUser = (user, callBack) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("users");
        collection.findOne({ googleId: user.googleId }).then(result => {
            if (result === null) {
                console.log("user not found so user will be created");
                collection.insertOne(user, (error, result) => {
                    console.log("user sent: ", user);
                    if (error) throw error;
                    callBack(result);
                    client.close();
                });
            } else {
                console.log("user already exists", user);
                callBack(result);
            }
        });
    });
};

const getUser = (userId, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("users");
        collection.findOne({ googleId: userId }).then(result => {
            callback(result);
            client.close();
        });
    });
};

const addTodoToList = (userId, todo, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }

        let collection = client.db("pomodoro").collection("users");
        collection.updateOne(
            { googleId: userId },
            { $push: { todos: todo } },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);

                client.close();
            }
        );
    });
};

const updateTodoInList = (userId, newTodo, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }

        let collection = client.db("pomodoro").collection("users");
        collection.updateOne(
            { googleId: userId, "todos.id": newTodo.id },
            { $set: { "todos.$": newTodo } },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);
                client.close();
            }
        );
    });
};

const deleteTodoFromList = (userId, todoId, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }

        let collection = client.db("pomodoro").collection("users");
        collection.updateOne(
            { googleId: userId },
            { $pull: { todos: { id: todoId } } },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);
                client.close();
            }
        );
    });
};

const updateTodoOrder = (userId, todoList, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("users");
        collection.updateOne(
            { googleId: userId },
            { $set: { todos: todoList } },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);
                client.close();
            }
        );
    });
};

const updateTodoTomatoePoints = (userId, todo, tomatoePoints, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("users");
        collection.updateOne(
            { googleId: userId, "todos.id": todo.id },
            { $set: { "todos.$.tomatoes": tomatoePoints } },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);
                client.close();
            }
        );
    });
};

const updateTotalTomatoePoints = (userId, tomatoePoints, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("users");
        collection.updateOne(
            { googleId: userId },
            { $set: { totalTomatoes: tomatoePoints } },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);
                client.close();
            }
        );
    });
};

module.exports = {
    addUser,
    getUser,
    addTodoToList,
    updateTodoInList,
    deleteTodoFromList,
    updateTodoOrder,

    updateTodoTomatoePoints,
    updateTotalTomatoePoints
};
