module.exports = app => {
  const assert = require('http-assert')
  const express = require('express')
  const fs = require('fs');
  const path = require('path');
  const WebUser = require('../../models/WebUser')
  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')
  const AlipaySDK = require("alipay-sdk").default;
  const AlipayFormData = require("alipay-sdk/lib/form").default;

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
  app.put('/web/api/orderList', authMiddleware(options), async (req, res) => {
    const model = await WebUser.findByIdAndUpdate(req.user._id, {
      orderList: req.body
    })
    res.send(model)
  })
  const Product = require('../../models/Product')
  //根据关键词返回商品
  app.post('/web/api/keyword', async (req, res) => {
    const model = await Product.find({
      name: new RegExp(req.body.query)
    })
    res.send(model.slice(0, 6))
  })
  //错误处理函数
  app.use(async (err, req, res, next) => {
    //没有状态码就报500错误
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

  //支付
  app.post('/web/api/pay', async (req, res) => {
    
    const alipaySdk = new AlipaySDK({
      appId: "2016102400750716", // 你自己的沙箱黄环境的appId
      privateKey: fs.readFileSync(
        path.join(__dirname, "../../pem/private_key.pem"),
        "ascii"
      ), // 私钥
      signType: "RSA2", // 签名类型
      alipayPublicKey: fs.readFileSync(
        path.join(__dirname, "../../pem/alipay_public_key.pem"),
        "ascii"
      ), // 支付宝公钥（不是应用公钥）
      gateway: "https://openapi.alipaydev.com/gateway.do", // 网关地址
      timeout: 5000, // 网关超时时间
      camelcase: true // 是否把网关返回的下划线 key 转换为驼峰写法
    });
    /**
     * 返回支付链接（PC支付接口）
     */
    const formData = new AlipayFormData();
    formData.setMethod("get");
    formData.addField("appId", "2016102400750716");
    formData.addField("charset", "utf-8");
    formData.addField("signType", "RSA2");
    formData.addField('returnUrl', 'http://127.0.0.1:8080/#/personal-center/order-list')
    formData.addField("bizContent", {
      outTradeNo: Date.now(),// 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
      productCode: "FAST_INSTANT_TRADE_PAY",// 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: req.body.totalPrice+'.00',// 【必选】订单总金额，精确到小数点后两位
      subject: "手机商品",// 【必选】 订单标题
      body: "手机商品" // 【可选】订单描述
    });
    /**
     * exec对应参数：
     * method（调用支付宝api）
     * params（api请求的参数（包含“公共请求参数”和“业务参数”））
     * options（validateSign，formData，log）
     */

    const result = await alipaySdk.exec(
      "alipay.trade.page.pay",
      {},
      { formData }
    );
    res.send({status:200,info:'查询成功',result})
  }

  )
}

