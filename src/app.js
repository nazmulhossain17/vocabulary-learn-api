const express = require("express");
const fileUpload = require("express-fileupload");
const userRoute = require("./routes/user.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

app.use("/api/auth", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
