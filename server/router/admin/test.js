const Router = require('koa-router')
const router = new Router()
const qiniu = require('qiniu')

const {list, up} = require('../../module/db/test')


const ACCESS_KEY = 'lLXziP_iXBUQTjytyuUJxbjhrHHcbTlPE2yA3sqg';
const SECRET_KEY = 'U6gMRLjydN_SJC50Znd2FMfEaJFFTBXKRGQ-D3KH';

const key = 'xxxx.mp4'


router.get('/test', async (ctx, next) => {
    let res = await list('user', {
        username: '222'
    })
    ctx.body = res
})

router.get('/create', async (ctx, next) => {
    let res = await up('user', {
        username: '222',
        password: '222'
    })
    ctx.body = res
})

router.get('/download', async (ctx, next) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(mac, config);
    let publicBucketDomain = 'http://static.wanhuatong.live';
    let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
    //下载
    console.log(publicDownloadUrl);
    ctx.body = publicDownloadUrl + '?attname='
})

//TODO 
router.get('/upload', async (ctx, next) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let options = {
        scope: 'liguidemo',
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);


    let localFile = "E:/WebstormProjects/koa-dome/server/module/db/asd.mp4";
    let config = new qiniu.conf.Config();
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();
    let key = 'xxxx123.mp4';
// 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, async function (respErr, respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
            let data = await respBody
            ctx.body = data
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
})


module.exports = router.routes()