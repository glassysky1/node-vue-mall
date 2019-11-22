module.exports = options => {
  return async (req, res, next) => {

    const jwt = require('jsonwebtoken')
    const WebUser = require(`../models/${options.modelName}`)

    //获取请求头
    //提取最后一个元素
    const token = String(req.headers.authorization || '').split(' ').pop()
    //如果token不存在
    // assert(token, 401, '请提供jwt token')
    //解密，把用户id解密出来
    if (!token) {
      next()
      return
    }
    const { id } = jwt.verify(token, req.app.get('secret'))
    // assert(id, 401, '无效的jwt token')
    // { id: '5dc782571e185487ec049538', iat: 1573369105 }
    //挂载在req上去
    req.user = await WebUser.findById(id)
    // { _id: 5dc782571e185487ec049538, username: 'admin', __v: 0 }
    // assert(user, 401, '请先登录')
    next()
  }
}