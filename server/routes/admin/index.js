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
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    //复数转单数
    const modelName = require('inflection').classify(req.params.resource)
    //请求对象上挂载一个属性
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

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

  //改变订单状态
  app.put('/admin/api/orderList/:id', async (req, res) => {
    const webUsers = await WebUser.find()
    let webUserIndex = 0
    let orderIndex = 0
    let webUserId = ''
    let orderId = ''
    let orderList = []
    webUsers.forEach((webUser, index) => {
      webUser.orderList.forEach((order, index1) => {
        if (order._id.toString() === req.params.id) {
          webUserId = webUser._id
          orderId = order._id
          webUserIndex = index
          orderIndex = index1
          order.status = 1
        }
      })
    })
    webUsers.forEach((webUser,index)=>{
      
      if(webUser._id === webUserId){
        orderList = webUser.orderList
      }
    })
    console.log(orderList);
    

    //  console.log(webUserIndex,orderIndex,webUserId,orderId);
    const webUser = await WebUser.findByIdAndUpdate(webUserId,
      {
        orderList
      })

    res.send(webUser)
  })

}