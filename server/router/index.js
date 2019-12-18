//装载所有子路由
const Router = require('koa-router')
const router = new Router()

//-----------------------------------
let home = require('./admin/home.js')
let admin = require('./admin/admin.js')
//TODO 测试
let test = require('./admin/test.js')
//-----------------------------------
const upload = require('./upload/upload')

let {api} = require('../aip/http')

//层级路由
router.use('/home', home)
router.use('/admin', admin)
router.use('/api', test)
router.use('/upload', upload)

//主页路由
router.get('/', async (ctx, next) => {
    const res = await api({})
    ctx.body = res
});

//主页
router.post('/', async (ctx, next) => {
    ctx.body = ctx.request.body
});

//默认（404）
router.get('*', (ctx, next) => {
    ctx.body = "404"
});

module.exports = router