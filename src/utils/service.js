// 对第三方包axios作封装,解决相同代码反复书写的问题
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

const service = axios.create({
    baseURL: "http://localhost:2999",
    timeout: 5000
})

// 添加一个请求拦截器
service.interceptors.request.use(
    config => {    // 请求发出前一定会走这里
        // Vue.prototype.$loading.open();       // 开启loading效果
        // 所有的ajax都强制带上请求头且在Authorization上带token
        // 在headers上拼Authorization, 如果请求没有headers, 则{} + "Authorization": token值
        config.headers = Object.assign({}, {Authorization: sessionStorage.getItem("token")}, config.headers || {});
        return config;
    }, 
    error => {    // 请求无法正常发出
        // Vue.prototype.$loading.close();          // 关闭loading效果
        Vue.prototype.$Alert(error.message) // 向用户提示错误信息
        return Promise.reject(error);
    }
);
// 添加一个响应拦截器
service.interceptors.response.use(
    ({ data: {code, data, msg} }) => {    // 客户端正常收到了服务器的响应
        // Vue.prototype.$loading.close();      // 关闭loading效果
        // const code = result.data.code;
        switch(code) {
            case 200:
                return data;
            case 401:
                Vue.prototype.$Alert('去登录');
                router.push({path: '/login', query: {target: router.currentRoute.fullPath}});
                return Promise.reject(new Error('未登录或登录超时'))
            case 199:
            case 500:
            case 404:
                Vue.prototype.$Alert(msg)
                return Promise.reject(new Error(msg));
            default: 
                console.log('永远到不了这里');
        }
        
    },
    error => {    // 客户端无法收到服务器的响应(服务器没开，url写错到不了服务器)
        // Vue.prototype.$loading.close();          // 关闭loading效果
        Vue.prototype.$Alert(error.message)    // 向用户提示错误信息
        return Promise.reject(error);
    }
);

export default service;