const express = require('express');
const app = express();

app.use(express.json());

const persist = require('./persist');

const flags = require('flags');
flags.defineNumber("port", 3000, "Ports of the http server");
flags.parse();

const dotenv = require('dotenv');
const port = flags.get("port") || process.env.PORT || 3000;

app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    res.json(todo);
    console.log(todo);
    //res.send("<h1> Todo List</h1>");
});

app.get("/todos", (req, res) => { 
    res.json(persist.getTodos());
});

app.post("/todo/:id", (req, res) => {
    console.log(req.params);
    const todo = persist.addTodo(req.params);
    res.json(todo);
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id; 
    const todo = persist.deleteTodo(id);
    res.json(todo);
    console.log(todo);
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todoData = req.body;
    const todo = setTodo(id , todoData);
    res.json(todo);
    console.log(todo);
});

app.patch("/todo/:id", (req, res) => {
    ///
    res.send("todo patch");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

