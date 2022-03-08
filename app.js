const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./model/Httperror");
const userRoute = require("./routes/users-route");
const app = express();

app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://admin-ajay:<password>@cluster0.oer4c.mongodb.net/dataDB?retryWrites=true&w=majority"
);

app.use("/api/users", userRoute);
app.use((req, res) => {
  throw new HttpError("could not find route", 404);
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured!" });
});

app.listen(5000, () => {
  console.log("Server running at Port 5000!");
});
