const Koa = require('koa');
const app = new Koa();
const router = require('./server/router/index')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

//中间件
app.use(bodyParser())

//加载路由中间件
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
})