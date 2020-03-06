import axios from "axios"
export function request(config) {
    // 根据当前baseURL创建axios实例
    const instance = axios.create({
        baseURL: "http://106.54.54.237:8000/api/wh",
        // baseURL: "http://123.207.32.32:8000/api/wh",  //该接口请求完详情页数据展示到页面中时会报错不知为何
        timeout: 5000
    })
    // axios拦截器
    instance.interceptors.request.use(config => {
        // somethings to do
        return config;
    },err => {
        // when send request error
    })
    instance.interceptors.response.use(res => {
        // someting to do
        return res.data;
    },err => {
        // when request failed
    })

    // 真正的数据请求：(instance本身返回promise，直接返回可在调用处执行.then)
    return instance(config)
}