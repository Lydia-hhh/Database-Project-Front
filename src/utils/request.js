import axios from 'axios'
import router from "@/router";
const request = axios.create({

    baseURL: '/api',
    timeout: 10000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let userJson = JSON.parse(localStorage.getItem('token'));
    // if(!userJson){
    //   router.push('/login');
    //}
    config.headers['Authentication'] = userJson  // 设置请求头  ycf
    //取出sessionStorage 里面缓存的用户信息
    /*let userJson=sessionStorage.getItem('user');//????
    if(!userJson){
        router.push('/login');
    }*/
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;

        if(res.code === '-9'){
            router.push('/login/user');
        }

        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

