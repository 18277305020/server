const {findList, findRepeat, createMember, getCount, removeById} = require('../db/utils/member')
const {salt} = require('../../lib/pbkdf2')
const {getToken} = require('../../lib/jwt')

//分页列表
const list = async (ctx, next) => {
    let page = ctx.request.body.page ? ctx.request.body.page : 1
    let size = ctx.request.body.size ? ctx.request.body.size : 10
    let params = ctx.request.body.query && ctx.request.body.query.username !== '' ? {...ctx.request.body.query} : {}
    let list = await findList(params, page, size)
    let count = await getCount(params)
    ctx.body = {
        code: 1,
        data: {
            list,
            count: Number(count[0].count),
            size,
            page
        },
        message: '查询成功'
    }
}

//查重
const repeat = async (ctx, next) => {
    let params = {...ctx.request.body}
    let data = await findRepeat({username: params.username})
    if (data.length > 0) {
        ctx.state.userHave = true
    } else {
        ctx.state.userHave = false
    }
    await next()
}

//新增
const create = async (ctx, next) => {
    console.log(ctx.state.userHave)
    if (ctx.state.userHave) {
        ctx.body = {
            code: 0,
            message: '用户已存在',
        }
    } else {
        let params = {...ctx.request.body}
        params.password = salt(params.password)
        let data = await createMember(params)
        let token = await getToken({data})
        ctx.body = {
            code: 1,
            message: '创建成功',
            data: {
                id: data[0].uid,
                name: data[0].username,
                token
            }
        }
    }
}

//登录
const login = async (ctx, next) => {
    let params = {...ctx.request.body}
    //解密
    params.password = salt(params.password)
    let data = await findRepeat(params)
    if (data.length > 0) {
        let token = await getToken(data[0])
        ctx.body = {
            code: 1,
            data: {
                id: data[0].uid,
                name: data[0].username,
                token
            },
            message: '登录成功',

        }
    } else {
        ctx.body = {
            code: 0,
            message: '用户账号或者密码错误'
        }
    }
}

//删除
const removeId = async (ctx, next) => {
    let params = {...ctx.request.body}
    await removeById(params)
    ctx.body = {
        code: 1,
        message: '删除成功'
    }
}

module.exports = {
    list,
    repeat,
    create,
    login,
    removeId
}
