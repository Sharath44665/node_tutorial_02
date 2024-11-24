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

app.post("/api/v1/tour", (req, res) => {
  const newId = tours.length - 1 + 1;
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

app.get("/api/v1/tour/:id", (req, res) => {
  // console.log(req.params)
  let id = req.params;
  const userId = Number(id.id);

  if (userId > tours.length) {
    return res
      .status(200)
      .json({ status: "success", msg: `${userId} not found in the database` });
  }

  const data = tours.find((el) => el.id === userId);
  console.log(data);

  res.status(200).json({
    msg: "success",
    data: { data },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on ${port}...`);
});

// output:
// whatever passed on postman body will be printed
