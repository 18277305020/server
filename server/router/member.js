const router = new require('koa-router')()
const {list, repeat, create, login, removeId} = require('../module/controller/member')
const {decoded, checkToken} = require('../lib/jwt')

//查询所有列表
router.post('/list', checkToken, list)

//新增
router.post('/create', repeat, create)

//登录
router.post('/login', login)

//获取用户信息
router.get('/userInfo', async (ctx, next) => {
    let token = ctx.request.header.authorization.split(' ')[1]
    let data = await decoded(token)
    ctx.body = {
        code: 1,
        data: {
            id: data[0].uid,
            name: data[0].username
        }
    }
})

//删除用户
router.post('/del', checkToken, removeId)

module.exports = router.routes()