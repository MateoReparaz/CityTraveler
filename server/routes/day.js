const distance = require("google-distance");
const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip")
const { APIMAPS } = process.env;

distance.apiKey = APIMAPS;

router.post("/data", (req, res, next) => {
    console.log({origin:`${req.body.origin.lng},${req.body.origin.lat}`,
    destination:`${req.body.destination.lng},${req.body.destination.lat}`})
  distance.get(

    {
    index: 1,
      origin:`${req.body.origin.lat},${req.body.origin.lng}`,
      destination:`${req.body.destination.lat},${req.body.destination.lng}`,
      mode: 'walking',
    },
    function(err, data) {
      if (err) return console.log(err);
      console.log(data);
      res.json(data);
    }
  );
});

//GET DAY
router.get("/:idDay/:idTrip", (req, res, next) => {
  const { idDay,idTrip } = req.params;
  Trip.findById(idTrip).then(trip => {
    const day = trip.schedule.find(e => {
      return e._id == idDay
    })
    res.json(day)
  });
});
module.exports = router