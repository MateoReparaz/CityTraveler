const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: "Poi" }],
  picture: String
});
TripSchema.set("timestamps", true);

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;