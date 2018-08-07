const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountriesSchema = Schema(
  {
    sygicId: String,
    name: String,
    pois: []
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Countries = mongoose.model("Countries", CountriesSchema);

module.exports = Countries;
