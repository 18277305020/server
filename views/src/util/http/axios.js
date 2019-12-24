import axios from 'axios'

//所有请求的携带的参数设置
const http = axios.create({
    baseURL: 'http://localhost:3000', //测试服
    timeout: 2000,
})

//设置拦截器
http.interceptors.request.use(function (config) {
    config.headers = {
        'content-type': 'application/json',
    }
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
}, err => {
    return err
})


http.interceptors.response.use(res => {
    return res
}, err => {
    //对响应数据error处理
    return err
})


export default http