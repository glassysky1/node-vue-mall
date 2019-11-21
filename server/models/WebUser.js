const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  addressList: [
    {
      username: { type: String },
      city:{type:String},
      streetName: { type: String },
      postCode: { type: Number },
      tel: { type: Number },
      isDefault: { type: Boolean }
    }
  ]
})

module.exports = mongoose.model('WebUser', schema)