/*包含n个请求函数的模块
* 函数的返回值：promise
* 第一个参数（url），第二个参数（post/get）--字符串*/
import http from './axios'

//----------------登录/退出-----------------------
export const login = (params) => post('/member/login', params)  //登陆

//----------------用户列表--------------------------

export const memberList = (params) => post('/member/list', params)

export const memberDel = (params) => post('/member/del', params)

//----------------基础请求--------------------------


export const post = http.post

export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        //拼接路径
        //getUrl = 改变后的路径
        let getUrl = ''
        //paramsStr = 拆分参数后得到的数组
        let paramsStr = []
        //校验参数类型
        if (typeof params === 'object') {
            for (let key in params) {
                paramsStr.push(key + '=' + params[key])
            }
            getUrl = '?' + paramsStr.join('&')
        } else if (params === undefined) {
            getUrl = ''
        } else {
            getUrl = params
        }
        //调用请求方法
        http.get(url + getUrl).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}