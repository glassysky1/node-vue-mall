const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  coverImage: { type: String },
  productId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },

})

module.exports = mongoose.model('Ad', schema)