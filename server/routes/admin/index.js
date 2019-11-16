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



  //一般接口

  const storage = require('../../models/Storage')
  const product = require('../../models/Product')


  const router1 = express.Router(
    {
      mergeParams: true
    }
  )

  //添加商品

  router1.post('/products', async (req, res) => {
    let storages = req.body.storages
    let storageIds = []
    for (let item of storages) {
      let newStorage = await storage.create(item)
      storageIds.push(newStorage._id.toString())
    }

    req.body.storages = storageIds

    const model = await product.create(req.body)
    res.send(model)
  })

  router1.get('/products/:id', async (req, res) => {
    const model = await product.findById(req.params.id).populate('storages')
    console.log(model);
    
    res.send(model)
  })

  //更新资源
  router1.put('/products/:id', async (req, res) => {

    let storages = req.body.storages
    //删除存储型号id
    let deleteStorages = req.body.deleteStorages
    for(let item of deleteStorages){
      await storage.findByIdAndDelete(item._id)
    }

    let storageIds = []
    for (let item of storages) {
      if(!item._id){
        let newStorage = await storage.create(item)
        storageIds.push(newStorage._id.toString())
      }else{
        await storage.findByIdAndUpdate(item._id,item)
        storageIds.push(item._id) 
      }
    }
    req.body.storages = storageIds
    const model = await product.findByIdAndUpdate(req.params.id, req.body)

    res.send(model)
  })
  //multer上传文件数据
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })

  router1.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  const Brand = require('../../models/Brand')
  //测试接口
  // app.use('/admin/api/productlist',async (req,res) =>{
  //   //聚合函数
  //   const brands = await Brand.aggregate([
  //     {
  //       $lookup:{
  //         from:'products',
  //         localField:'_id',
  //         foreignField:'brand',
  //         as:'productList'
  //       }
  //     }
  //   ])
  //   brands.map(brand =>{
  //     brand.productList.map(product =>{
  //       product.brandName = brand.name
  //     })
  //   })
  //   res.send(brands)
  // })

  const Product = require('../../models/Product')
  //测试接口
  router1.use('/admin/api/productlist', async (req, res) => {
    const products = await Product.find().populate('brand').lean()
    // [
    //   {
    //     "_id": "5dccaf36316ccd42b8822e72",
    //     "brand": {
    //       "_id": "5dca32bf47b5b9becc02ba56",
    //       "name": "小米",
    //       "__v": 0
    //     },
    //     "name": "小米6",
    //     "createdAt": "2019-11-14T01:34:46.171Z",
    //     "updatedAt": "2019-11-14T01:34:46.171Z",
    //     "__v": 0
    //   },

    res.send(products)
  })
  app.use('/admin/api', router1)
}