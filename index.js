const express = require('express');
const app = express();

app.use(express.json());

const mongodb = require('./persist/mongo');

const Todo = require('./persist/todo');

const flags = require('flags');
flags.defineNumber("port", 3000, "Ports of the http server");
flags.parse();

const dotenv = require('dotenv');
const port = flags.get("port") || process.env.PORT || 3000;

app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findById(id)
    .then((todo) =>{
        if(todo == null){
            res.status(404).json({message: "not found"});
        }else{
            res.json(todo);
        }
    })
    .catch((err) =>{
        res.status(500).json(err);
    });
    //console.log(todo);
    //res.send("<h1> Todo List</h1>");
});

app.get("/todos", (req, res) => { 
    Todo.find()
        .then((todos)=>{
            res.json(todos);
        })
        .catch((err) =>{
            res.status(500).json(err);
        });
});

app.post("/todo", (req, res) => {
    console.log(req.params);
    const valTodo = setupTodo(req.body); 
    Todo.create(valTodo)
        .then((todo)=>{
        if(todo == null){
            res.status(404).json({message: "not found"});
        }else{
            res.json(todo);
        }
        })
        .catch((err)=>{
            res.status(500).json(err);
        });
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id; 
    Todo.findByIdAndDelete(id)
        .then((todo) =>{
        if(todo == null){
            res.status(404).json({message: "not found"});
        }else{
            res.json(todo);
        }
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const valTodo = setupTodo(req.body);
    Todo.findByIdAndUpdate(id, valTodo, {returnDocument:'after'})
    .then((todo)=>{
        if(todo == null){
            res.status(404).json({message: "not found"});
        }else{
            res.json(todo);
        }
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
    //console.log(todo);
});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todoData = req.body;
    Todo.findByIdAndUpdate(id, todoData, {returnDocument:'after'})
    .then((todo)=>{
        if(todo == null){
            res.status(404).json({message: "not found"});
        }else{
            res.json(todo);
        }
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
});

mongodb.setUpConnectionHandlers(() =>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
mongodb.connect();

setupTodo = function(todoData) {
    let deadline = new Date();
    let done = false;
    if (todoData.deadline){
        deadline = new Date(todoData.deadline);
    }
    if (todoData.done){
        done = todoData.done;
    }
    return {
        name : todoData.name || "",
        description : todoData.description || "",
        done : done,
        deadline : deadline,
    };
};
