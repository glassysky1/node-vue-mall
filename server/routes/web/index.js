module.exports = app => {
  const assert = require('http-assert')
  const express = require('express')
  const WebUser = require('../../models/WebUser')
  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')
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

  const options = {
    modelName: 'WebUser'
  }

  app.use('/web/api/rest/:resource', authMiddleware(options), resourceMiddleware(), router)

  const Brand = require('../../models/Brand')
  // 品牌列表
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

  //登陆接口
  app.post('/web/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await WebUser.findOne({ username }).select('+password')
    assert(user, 422, '用户名不存在')
    //校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)

    //如果密码不对
    assert(isValid, 422, '密码错误')
    //返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })
  //获取用户状态
  app.get('/web/api/user', authMiddleware(options), async (req, res) => {
    if (req.user) {
      res.send(req.user)
      return
    }
    res.send({})
  })

  //用户地址
  app.put('/web/api/addressList', authMiddleware(options), async (req, res) => {
    const model = await WebUser.findByIdAndUpdate(req.user._id, {
      addressList: req.body
    })
    res.send(model)
  })

  //用户购物车
  app.put('/web/api/cartList', authMiddleware(options), async (req, res) => {
    const model = await WebUser.findByIdAndUpdate(req.user._id, {
      cartList: req.body
    })
    res.send(model)
  })
  //错误处理函数
  app.use(async (err, req, res, next) => {
    //没有状态码就报500错误
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}