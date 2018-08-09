const express = require("express");
const countries = require("../models/Country");
const cities = require("../models/City");
const user = require("../models/User");
const Cities = require("../models/Cities");
const Trip = require('../models/Trip')
const router = express.Router();
const axios = require("axios");

const apiOptions = {
  baseURL: process.env.SYGIC_URL,
  headers: { "x-api-key": process.env.SYGIC_API_KEY }
};



//API CALL TO GET POIS AND ADD THEM TO CITY IN DB
router.get("/:id", (req, res, next) => {
  Trip.findById(req.params.id)
  .then(trip => {
    Cities.findOne({ sygicId: `city:${trip.city.id}` })
      .then(city => {
        if ((!city.pois.length)) {
          axios
            .get(
              `/places/list?parents=city:${trip.city.id}&level=poi&limit=100`,
              apiOptions
            )
            .then(poi => {
               city.update({pois: poi.data.data.places}, {new:true})
              .then(() => {res.status(200).json(poi.data.data.places)
              });
            })
            .catch(error => res.status(500).json(error));
        } else {
          res.json(city.pois);
        }
      })
      .catch(error => res.json(error));
  })
  .catch(error => res.json(error));
});

//DELETE POI FROM DAY
router.post("/delete", (req, res, next) => {
  const { tripId, index, tripDay } = req.body;
  Trip.findByIdAndUpdate(tripId).then(trip => {
    let day = trip.schedule.find(element => element.day == tripDay);
    trip.schedule[trip.schedule.indexOf(day)].pois.splice(index, 1);
    const updatedDay = trip.schedule;
    trip
      .update({ schedule: updatedDay })
      .then(() => res.json())
      .catch(error => res.json(error));
  });
});


module.exports = router;
