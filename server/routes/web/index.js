module.exports = app => {
  const express = require('express')
  const router = express.Router(
    {
      mergeParams: true
    }
  )
  // 增加资源
  router.post('/', async (req, res) => {

    const model = await req.Model.create(req.body)

    res.send(model)
  })
  //查找资源
  router.get('/', async (req, res) => {

    const queryOptions = {}
    if (req.Model.modelName === 'Product') {
      queryOptions.populate = 'brand'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })
  //更新资源
  router.put('/:id', async (req, res) => {

    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)

    res.send(model)
  })
  //按id查找资源
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)

    res.send(model)
  }),
    //删除资源
    router.delete('/:id', async (req, res) => {
      await req.Model.findByIdAndDelete(req.params.id)
      res.send({
        success: 'true'
      })
    })
  //通用接口
  app.use('/web/api/rest/:resource', async (req, res, next) => {
    //复数转单数
    const modelName = require('inflection').classify(req.params.resource)
    //请求对象上挂载一个属性
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const Brand = require('../../models/Brand')
  // 测试接口
  app.use('/web/api/brandList', async (req, res) => {
    //聚合函数
    const brands = await Brand.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'brand',
          as: 'productList'
        }
      }
    ])
    brands.map(brand => {
      brand.productList.map(product => {
        product.brandName = brand.name
      })
    })
    res.send(brands)
  })


}