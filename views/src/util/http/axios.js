import axios from 'axios'
import router from "../../router";

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
}, function (error) {

    return error
})


http.interceptors.response.use(res => {
    if (res.data.code === 0) {
        router.push('/login')
    }
    return res
}, err => {
    //对响应数据error处理
    return err
})


export default http