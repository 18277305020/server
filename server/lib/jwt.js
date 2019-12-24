const jwt = require('jsonwebtoken');

//生成token
const getToken = async (params) => {
    return await jwt.sign(params, 'mishi', {
        expiresIn: 60 * 60 * 12
        //expiresIn: 60
    })
}

//解密
const decoded = async (token) => {
    try {
        return await jwt.verify(token, 'mishi');
    } catch (err) {
        return 'token不存在'
    }
}

//校验token有效性中间件
const checkToken = async (ctx, next) => {
    if (ctx.request.header.authorization) {
        let token = ctx.request.header.authorization
        await jwt.verify(token, 'mishi', async (err, decoded) => {
            if (!err) {
                ctx.state.user = decoded
                await next()
            } else {
                ctx.body = {
                    code: 0,
                    message: '用户信息已过期,请重新登录'
                }
            }
        })
    } else {
        ctx.body = {
            code: 0,
            message: '用户不存在'
        }
    }
}

module.exports = {
    getToken, decoded, checkToken
}

