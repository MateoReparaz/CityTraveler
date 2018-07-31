const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    dates: { type: Array, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    city: {
      name: { type: String, required: true },
      id: { type: Number, required: true }
    },
    img: { type: String, required: true, default: "assets/img/map.jpg" },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
