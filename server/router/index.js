//装载所有子路由
const Router = require('koa-router')
const router = new Router()

const upload = require('./upload/upload')

let {api} = require('../aip/http')

//层级路由
router.use('/upload', upload)

//主页路由
router.get('/', async (ctx, next) => {
    const res = await api({})
    ctx.body = res
});

//默认（404）
router.get('*', (ctx, next) => {
    ctx.body = "404"
});

module.exports = router