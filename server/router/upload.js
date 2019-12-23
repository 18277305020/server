const router = new require('koa-router')()
const {uploadMedia, recordUrl, getUrlList, download} = require('../module/controller/upload')

//上传接口
//router.post('/media', uploadMedia)

//记录url
router.get('/record', getUrlList, recordUrl)

//获取url列表
router.get('/getMediaList', getUrlList)

//下载
router.get('/download', download)

module.exports = router.routes()