const express = require("express");
const countries = require("../models/Country");
const cities = require("../models/City");
const user = require("../models/User");
const moment = require("moment");
const router = express.Router();
const Trip = require("../models/Trip");

router.get("/", (req, res, next) => {
  Trip.find({}).exec((err, trips) => {
    if (err) {
    return res.status(500).json(err);
    }
    return res.status(200).json(trips);
  });
});

const getDates = function(startDate, endDate) {
  let dates = [];
  let currDate = moment(startDate).startOf("day");
  let lastDate = moment(endDate).startOf("day");
  do {
    dates.push(currDate.clone());
  } while (currDate.add(1, "days").diff(lastDate) < 1);
  return dates;
};

router.post("/", (req, res, next) => {
  let dates = [];

  let countryName = req.body.country;
  let countryID = countries[countryName];

  let cityName = req.body.city;
  let cityID = cities[countryID][cityName];
  const newTrip = new Trip({
    dates: getDates(req.body.start, req.body.end),
    userId: req.user.id,
    country: {
      name: countryName,
      id: countryID
    },
    city: {
      name: cityName,
      id: cityID
    }
  });
  newTrip
    .save()
    .then(trip => res.status(200).json(trip))
    .catch(error => {console.log(error)
      res.status(500).json(error)});
});

module.exports = router;
