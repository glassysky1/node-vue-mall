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
      productMaxNum: { type: Number },
      storageId: { type: String },
      storageName: { type: String },
      colorId: { type: String },
      colorName: { type: String },
      checked: { type: Boolean },
    }
  ],
  orderList: [
    {
      address: { type: Object },
      cartList: { type: Array },
      status: { type: Number }, //0是带发货，1是已发货，带收货，2是收货成功
      paymentMethod: { type: Number },
      totalPrice: { type: Number },
      totalNumber: { type: Number },
      createTime:{type:String}

    },
    {
      timestamps: true//时间戳创建时间
    }
  ]
})

module.exports = mongoose.model('WebUser', schema)