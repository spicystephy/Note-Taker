const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000

//middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static utilizes code within public directory
app.use(express.static("public"));

//html routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})

//api routes
app.get("/api/notes", function(req, res){
    //gets notes, res.json to the front end, aka getNotes
    fs.readFile("./db/db.json", "utf8", function (err,data){
        res.json(JSON.parse(data));
    });
});
app.post("/api/notes", function(req, res){
    //create note from req.body aka saveNote
    const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    console.log(note);
    res.json(note);
});
app.delete("/api/notes/:id", function(req, res){
    //deletes notes based on id aka deleteNote
    const { id } = req.params;
});


app.listen(PORT, ()=> console.log("App listening on port " + PORT));