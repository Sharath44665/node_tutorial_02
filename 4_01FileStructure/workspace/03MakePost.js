const express = require("express");
const fs = require("fs");

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));
const app = express();

app.use(express.json()); // middleware

// app.get("/", (req, res) => {
//     res.status(200)
//     .json({"msg":"hello express js...", "app": "natours"})
// })

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours: tours },
  });
});

app.post("/api/v1/tours", (req, res) => {
  
  const newId = (tours.length - 1) + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          "new tour": newTour,
        },
      });
    }
  );
  // console.log(req.body);
  // res.send("done");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on ${port}...`);
});

// output:
// whatever passed on postman body will be printed
