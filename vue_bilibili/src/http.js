import axios from 'axios';
import router from './router/index';
const http = axios.create({
        baseURL: 'http://112.74.99.5:3000/web/api'
    })
    // 添加请求拦截器
http.interceptors.request.use(function(config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    if (response.status !== 200) {
        router.push('/login')
    }
    // console.log(response);
    return response;
}, function(error) {
    // 对响应错误做点什么
    // console.dir(error);
    return Promise.reject(error);
});

export default http;