const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String},
  colors:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Color'}]
})

module.exports = mongoose.model('Storage', schema)