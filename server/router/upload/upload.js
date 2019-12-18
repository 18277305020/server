const router = new require('koa-router')()
const {uploadMedia} = require('../../module/controller/upload')

//上传接口
router.post('/media', uploadMedia)

//记录url
router.post('/record', async (ctx) => {
    ctx.body = "record";
})

module.exports = router.routes()