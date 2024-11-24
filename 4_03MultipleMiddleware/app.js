const express = require("express");
const fs = require("fs");
const morgan = require('morgan')
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

const app = express();

app.use(express.json()); // middleware

app.use((req, res, next) => {
  // applies to every single request, NOTE that where you mention this code is important
  console.log("hello this is middleware");
  next();
});
app.use(morgan('dev')); // 3rd party middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use("/api/v1/tour", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app;
