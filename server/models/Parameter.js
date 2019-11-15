const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  score: { type: Number },
  productionDate: { type: String },
  screenMaterial: { type: String },
  screenSize: { type: String },
  resolution: { type: String },
  screenRatio: { type: String },
  cpuType: { type: String },
  ramSize: { type: String },
  ramType: { type: String },
  romSize: { type: String },
  romType:{type:String},
  batteryCapacity:{type:String},
  rearCamera:{type:String},
  frontCamera:{type:String},
  weight:{type:String}
})

module.exports = mongoose.model('Parameter', schema)