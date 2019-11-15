const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  brand: { type: mongoose.SchemaTypes.ObjectId, ref: 'Brand' },
  subtitle: { type: String },//副标题
  detail: { type: String },//详情
  coverImage: { type: String },//封面图片
  detailImage: { type: String },//详情图片
  storages: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Storage' }],//存储容量
  parameter: {
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
    romType: { type: String },
    batteryCapacity: { type: String },
    rearCamera: { type: String },
    frontCamera: { type: String },
    weight: { type: String }
  }
},
  {
    timestamps: true//时间戳创建时间
  })

module.exports = mongoose.model('Product', schema)