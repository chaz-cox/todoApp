const mongoose = require('mongoose');

const db = mongoose.connection;

function connect(user, password, host, port, db){
    const connectionString = `mongodb+srv://chaz-cox:chaz-cox@cluster0.s04ylrn.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

function setUpConnectionHandlers(callback){
    //What should happen when it start connecting?
    db.once("connecting", () =>{
        console.log("Connecting to MongoDB");
    });
    // what should happen when it's connected?
    db.once("connected", () =>{
        console.log("Connected to MongoDB");
    });
    //What should happen when it opens?
    db.once("open", () =>{
        console.log("Open Connection to MongoDB");
        callback();
    });
    //What should happen when it errors?
    db.once("error", () =>{
        console.log("Error Connection to MongoDB");
    });
}

//export the functions
module.exports={
    connect: connect,
    setUpConnectionHandlers: setUpConnectionHandlers,

};
