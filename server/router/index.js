//装载所有子路由
const Router = require('koa-router')
const router = new Router()

const member = require('./member')
const upload = require('./upload')

let {api} = require('../aip/http')

//层级路由
router.use('/upload', upload)
router.use('/member', member)

//主页路由
// router.get('/', async (ctx, next) => {
//     const res = await api({})
//     ctx.body = res
// });

//默认（404）
router.get('*', (ctx, next) => {
    ctx.body = "404"
});

module.exports = router