const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

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


