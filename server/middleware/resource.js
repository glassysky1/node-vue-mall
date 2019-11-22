module.exports = options => async (req, res, next) => {
  //复数转单数
  
  const modelName = require('inflection').classify(req.params.resource)
  //请求对象上挂载一个属性
  req.Model = require(`../models/${modelName}`)
  next()
}