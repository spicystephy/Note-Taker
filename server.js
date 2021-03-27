const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8080;

// app.get("*", function (req, res) {
//   res.send("I am the heroku test application");
// });

//middleware functions for express to format data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static utilizes code within public directory
app.use(express.static("public"));

//html routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//api routes to get, post and delete data
app.get("/api/notes", function (req, res) {
  //gets notes, res.json to the front end, aka getNotes
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  //create note from req.body aka saveNote
  const note = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    var parseNote = JSON.parse(data);
    parseNote.push(note);
    parseNote = JSON.stringify(parseNote);

    fs.writeFile("./db/db.json", parseNote, function (err) {
      if (err) throw err;
    })
    //once note is saved, will populate on left and redirect to blank note
    res.redirect("back")
  })
});

app.delete("/api/notes/:id", function (req, res) {
  //deletes notes based on id aka deleteNote. Curly brackets destructure so id not needed after params
  const { id } = req.params;

});

app.listen(PORT, () => console.log("App listening on port " + PORT));
