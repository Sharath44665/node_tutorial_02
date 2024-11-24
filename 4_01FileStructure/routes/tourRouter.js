const express = require("express");
const fs = require('fs')
const { getAllTours, createTour, getFromId} = require('../controllers/tourController')

const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getFromId);

module.exports = tourRouter;
