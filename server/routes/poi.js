const express = require("express");
const countries = require("../models/Country");
const cities = require("../models/City");
const user = require("../models/User");
const Cities = require("../models/Cities");
const router = express.Router();
const axios = require("axios");

const apiOptions = {
  baseURL: process.env.SYGIC_URL,
  headers: { "x-api-key": process.env.SYGIC_API_KEY }
};

router.get("/:id", (req, res, next) => {
  Cities.findOne({ sygicId: `city:${req.params.id}` })
    .then(city => {
      if ((!city.pois.length)) {
        axios
          .get(
            `/places/list?parents=city:${req.params.id}&level=poi&limit=50`,
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
});

module.exports = router;
