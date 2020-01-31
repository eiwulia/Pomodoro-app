const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const settings = { useNewUrlParser: true, useUnifiedTopology: true };
const url = "mongodb://localhost:27017";

// const { performance } = require("perf_hooks");

const addUser = (user, callBack) => {
    // connect to database
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        // connect to collection
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

// const getUser = (user, callback) => {
//     MongoClient.connect(url, settings, (error, client) => {
//         if (error) {
//             throw error;
//         }
//         let collection = client.db("pomodoro").collection("users");
//         let o_id = new ObjectId(user);
//         collection.findOne({ _id: o_id }).then(result => {
//             callback(result);
//             console.log("found user?: ", result);
//             client.close();
//         });
//     });
// };

const addTodo = (todo, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("todos");
        collection.insertOne(todo, (error, result) => {
            if (error) throw error;
            callback(result.insertedId);
            client.close();
        });
    });
};

const getTodos = callback => {
    // let start = performance.now();
    MongoClient.connect(url, settings, (error, client) => {
        // let diff = performance.now() - start;
        // console.log("diff inside mongo: ", diff);
        if (error) {
            throw error;
        }
        let collection = client.db("pomodoro").collection("todos");
        collection.find({}).toArray((error, result) => {
            if (error) throw error;
            callback(result);
            console.log("mongo db result of todos: ", result);
            client.close();
        });
    });
};

const deleteTodo = (id, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let o_id = new ObjectId(id);
        let collection = client.db("pomodoro").collection("todos");
        collection.deleteOne({ _id: o_id }, null, (error, result) => {
            if (error) throw error;
            console.log("delete id: id ", id, "result.result: ", result.result);
            callback(result);
            client.close();
        });
    });
};

const updateTodo = (todo, callback) => {
    MongoClient.connect(url, settings, (error, client) => {
        if (error) {
            throw error;
        }
        let o_id = new ObjectId(todo.id);
        let collection = client.db("pomodoro").collection("todos");
        collection.updateOne(
            { _id: o_id },
            { $set: todo },
            null,
            (error, result) => {
                if (error) throw error;
                callback(result);
                client.close();
            }
        );
    });
}; //

module.exports = {
    addUser,
    addTodo,
    getTodos,
    deleteTodo,
    updateTodo
};
