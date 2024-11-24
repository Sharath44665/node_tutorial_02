const express = require("express");
const fs = require("fs");
const morgan = require('morgan')

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));
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

// app.get("/", (req, res) => {
//     res.status(200)
//     .json({"msg":"hello express js...", "app": "natours"})
// })
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

const createTour = (req, res) => {
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
};




const getFromId = (req, res) => {
  // console.log(req.params)
  let id = req.params;
  const userId = Number(id.id);

  if (userId > tours.length) {
    return res
      .status(200)
      .json({ status: "success", msg: `${userId} not found in the database` });
  }

  const data = tours.find((el) => el.id === userId);
  // console.log(data);

  res.status(200).json({
    msg: "success",
    data: { data },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    "status":"some error",
    "msg": "not yet defined"
  })
}

const getOneUser = (req, res) => {
  res.status(500).json({
    "status":"some error",
    "msg": "not yet defined"
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    "status":"some error",
    "msg": "not yet defined"
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    "status":"some error",
    "msg": "not yet defined"
  })
}


const deleteUser = (req, res) => {
  res.status(500).json({
    "status":"some error",
    "msg": "not yet defined"
  })
}



const tourRouter = express.Router();
const userRouter = express.Router();

// app.get("/api/v1/tour", getAllTours);

// app.post("/api/v1/tour", createTour);

// app.get("/api/v1/tour/:id", getFromId);
// app.route("/api/v1/tour").get(getAllTours).post(createTour);
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getFromId)

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tour", tourRouter)
app.use("/api/v1/users", userRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`app running on ${port}...`);
});

// output:
// whatever passed on postman body will be printed