const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx) => {
    ctx.body = "admin首页";
})

router.get('/news', async (ctx) => {
    ctx.body = '这是admin新闻页面';
})

router.get('/admin', async (ctx) => {
    ctx.body = '这是admin页面';
})

module.exports = router.routes()