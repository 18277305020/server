const {setUrl, getUrl} = require('../db/utils/upload')
const qiniu = require('qiniu')

const uploadMedia = (ctx, next) => {
    ctx.body = 'test'
}

const recordUrl = async (ctx, next) => {
    ctx.state.next = false
    if (ctx.state.getUrlList.length > 0) {
        ctx.body = {
            message: '已存在，请重新输入'
        }
    } else {
        let data = await setUrl({url: ctx.request.query.url})
        ctx.body = data[0]
    }
}

const getUrlList = async (ctx, next) => {
    ctx.state.next = true
    let params = ctx.request.query ? ctx.request.query : {}
    ctx.state.getUrlList = await getUrl(params)
    await next()
    if (!ctx.state.next) return
    ctx.body = {
        data: ctx.state.getUrlList,
        message: '查询成功'
    }
}

const download = async (ctx, next) => {
    let ACCESS_KEY = 'lLXziP_iXBUQTjytyuUJxbjhrHHcbTlPE2yA3sqg';
    let SECRET_KEY = 'U6gMRLjydN_SJC50Znd2FMfEaJFFTBXKRGQ-D3KH';
    //const key = 'xxxx.mp4'

    let key = ctx.request.query.key
    let url = 'http://static.wanhuatong.live'

    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
    let config = new qiniu.conf.Config()
    let bucketManager = new qiniu.rs.BucketManager(mac, config)
    let publicBucketDomain = url
    let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key)
    //下载
    ctx.body = {
        mediaName: ctx.request.query.key,
        playAddress: publicDownloadUrl,
        download: publicDownloadUrl + '?attname='
    }
}

module.exports = {
    uploadMedia,
    recordUrl,
    getUrlList,
    download
}