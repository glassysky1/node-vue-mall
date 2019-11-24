const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
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
      city: { type: String },
      streetName: { type: String },
      postCode: { type: Number },
      tel: { type: Number },
      isDefault: { type: Boolean }
    }
  ],
  cartList: [
    {
      productId: { type: String },
      productName: { type: String },
      productCoverImage: { type: String },
      productPrice: { type: Number },
      productSubtitle: { type: String },
      productNum: { type: Number },
      storageId: { type: String },
      storageName: { type: String },
      colorId: { type: String },
      colorName: { type: String },
      checked: { type: Boolean },
    }
  ],
  orderList: { type: Array }
})

module.exports = mongoose.model('WebUser', schema)