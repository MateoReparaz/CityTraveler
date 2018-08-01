const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const citiesSchema = new Schema({
    sygicId: String,
    name: String,
    countrySygicId: String,
    pois:Array,
    countryId:{type:Schema.Types.ObjectId, ref: "Country"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cities = mongoose.model('Cities', citiesSchema);
module.exports = Cities;