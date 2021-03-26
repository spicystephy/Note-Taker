const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("*", function (req, res) {
  res.send("I am the heroku test application");
});

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
  fs.readFile(".?db/db.json", "utf8", function (err, data) {
    var parsedData = JSON.parse(data);

    console.log(data);
    console.log("parsed data", parsedData);

    parsedData.push(note);
    console.log("parsed data with push", parsedData);

    parsedData = JSON.stringify(parsedData);
    console.log("stringified data with push", parsedData);

    fs.writeFile("./db/db.json", parsedData, function (err) {
      if (err) throw err;
      console.log("saved");
    })
  })
});

app.delete("/api/notes/:id", function (req, res) {
  //deletes notes based on id aka deleteNote. Curly brackets destructure
  const { id } = req.params;
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
