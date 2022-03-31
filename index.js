const express = require("express");
const multer = require("multer");
const path = require("path");
const apiHandler = require("./api_handler/api_handler");

const app = express();
app.use(express.static(path.join(__dirname + "/uploads")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index", { hasil: "" });
});

app.post("/ekstrak", upload.single("file"), apiHandler.ekstrak);

app.listen(5050, () => {
  console.log("App is listening on port 5050");
});
