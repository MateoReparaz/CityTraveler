const express = require("express");
const countries = require("../models/Country");
const cities = require("../models/City");
const user = require("../models/User");
const moment = require("moment");
const router = express.Router();
const Trip = require("../models/Trip");
const flags = require("../models/Flag")

router.get("/", (req, res, next) => {
  console.log(req.user._id)
  Trip.find({userId:req.user._id})
  .exec((err, trips) => {
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
  let img = flags.filter(e=>{
    return e.name == countryName
  })
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
    },
    img:img[0].flag
  });
  newTrip
    .save()
    .then(trip => res.status(200).json(trip))
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post("/trip/update", (req, res, next) => {
  const { tripId, poi, tripDay } = req.body;
  Trip.findById(tripId).then(trip => {
    const day = trip.schedule.find(element => element.day == tripDay);
    if (day == undefined) {
      trip
        .update({ $push: { schedule: { day: tripDay, pois: [poi] } } })
        .then(() => res.json())
        .catch(error => res.json(error));
    } else {
      trip.schedule[trip.schedule.indexOf(day)].pois.push(poi);
      let p = trip.schedule;
      trip
        .update({ schedule: p })
        .then(() => res.json())
        .catch(err => res.json(err));
    }
  });
});

router.get('/delete/:id',(req,res,next) => {
  const {id} = req.params;
  Trip.findByIdAndRemove(id)
      .then( obj => {
          if(obj){
              res.status(200).json({status:`Removed from db`});
          }else{
              throw new Error("Not existing ID");
          }
      })
      .catch(e => next(e))
})

module.exports = router;
