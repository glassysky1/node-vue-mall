const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  oldPrice: { type: Number },
  nowPrice: { type: Number },
  stock: { type: Number },
  salesVolume: { type: Number }
})

module.exports = mongoose.model('Storage', schema)