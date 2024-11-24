const express = require("express");
const fs = require("fs");
const {
  getAllTours,
  createTour,
  getFromId,
  checkId
} = require("../controllers/tourController");

const tourRouter = express.Router();

tourRouter.param("id", checkId); // you can use this for patch and delete

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getFromId);
// tourRouter.get("/:id", getFromId);
module.exports = tourRouter;
