import axios from 'axios'

//拦截请求
axios.interceptors.request.use(function(config){
    return config
})

//拦截响应
axios.interceptors.response.use(function(config){
    return config
})