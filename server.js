const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080

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
})
app.post("/api/notes", function(req, res){
    //create note from req.body aka saveNote
})
app.delete("/api/notes/:id", function(req, res){
    //deletes notes based on id aka deleteNote
    const { id } = req.params;
});


app.listen(PORT, ()=> console.log("App listening on port " + PORT));