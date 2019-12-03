module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
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

  const options = {
    modelName: 'AdminUser'
  }
  //通用接口
  app.use('/admin/api/rest/:resource', authMiddleware(options), resourceMiddleware(), router)

  const AdminUser = require('../../models/AdminUser')
  //登陆接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await AdminUser.findOne({ username }).select('+password')
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
  app.get('/admin/api/user', authMiddleware(options), async (req, res) => {
    if (req.user) {
      res.send(req.user)
      return
    }
    res.send({})
  })



  //multer上传文件数据
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })



  const Brand = require('../../models/Brand')
  // 测试接口
  app.use('/admin/api/brandList', async (req, res) => {
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

  const WebUser = require('../../models/WebUser')
  //订单接口
  app.get('/admin/api/orderList', async (req, res) => {
    const webUsers = await WebUser.find()
    let orders = []
    webUsers.map((webUser, index) => {
      orders.push(...webUser.orderList)
    })
    res.send(orders)
  })

  const Product = require('../../models/Product')
  //改变订单状态
  app.put('/admin/api/orderList/:id', async (req, res) => {
    const webUsers = await WebUser.find()
    let webUserIndex = 0
    let orderIndex = 0
    let webUserId = ''
    let orderId = ''
    let orderList = []
    let changeCartList = []
    webUsers.forEach((webUser, index) => {
      webUser.orderList.forEach((order, index1) => {
        if (order._id.toString() === req.params.id) {
          webUserId = webUser._id
          orderId = order._id
          webUserIndex = index
          orderIndex = index1
          order.status = 1
          changeCartList = order.cartList
        }
      })
    })
    webUsers.forEach((webUser, index) => {

      if (webUser._id === webUserId) {
        orderList = webUser.orderList
      }
    })

    //把产品列表提出来,发货的时候数量减减
    changeCartList.forEach(async (cart, index) => {
      // console.log(cart.productId);
      // console.log(cart.storageId);
      // console.log(cart.colorId);
      // console.log(cart.productNum);

      const product = await Product.findById(cart.productId)
      product.storages.forEach((storage, index) => {
        if (storage._id.toString() === cart.storageId) {

          storage.colors.forEach((color, index) => {
            if (color._id.toString() === cart.colorId) {
              let flag = false
              if (color.stock - cart.productNum >= 0) {
                flag = true
              }
              if (!flag) {
                return res.status(422).send({
                  message: `库存不足，请及时添加：[${cart.productName},${cart.storageName},${cart.colorName}]`
                })
              }
              // assert(flag, 422, `库存不足，请及时添加：[${cart.productName},${cart.storageName},${cart.colorName}]`)
              color.stock = color.stock - cart.productNum
              color.salesVolume = color.salesVolume + cart.productNum
            }
          })
        }

      })

      await Product.findByIdAndUpdate(cart.productId, {
        storages: product.storages
      }
      )

    })
    //  console.log(webUserIndex,orderIndex,webUserId,orderId);
    const webUser = await WebUser.findByIdAndUpdate(webUserId,
      {
        orderList
      })

    res.send(webUser)
  })
  //错误处理函数
  app.use(async (err, req, res, next) => {
    //没有状态码就报500错误
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}