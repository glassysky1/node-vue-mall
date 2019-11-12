const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  brand:{type:mongoose.SchemaTypes.ObjectId,ref : 'Brand'}
})

module.exports = mongoose.model('Product', schema)