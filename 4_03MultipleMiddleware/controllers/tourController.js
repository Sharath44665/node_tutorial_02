const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next,val) => {

  console.log(`tour id is: ${val}`);
  let id = req.params;
  const userId = Number(id.id);
  if (userId > tours.length) {
    console.log("done")
    return res
      .status(200)
      .json({ status: "success", msg: `${userId} not found in the database` });
  }
  next();
}

exports.checkBody = (req, res, next) => {

  console.log(req.body.name)
  if (!req.body.name || !req.body.price){
    return res.status(400).json({
      "status": "fail",
      "msg": "not found name or price"

    })
  }
  
  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

exports.createTour = (req, res) => {
  const newId = tours.length - 1 + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.getFromId = (req, res) => {
  let id = req.params;
  const userId = Number(id.id);
  
  const data = tours.find((el) => el.id === userId);
  // console.log(data);

  res.status(200).json({
    msg: "success",
    data: { data },
  });
};


