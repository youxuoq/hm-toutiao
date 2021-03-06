// 封装axios
import axios from 'axios'
import JSONBigint from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    if (data) {
      return JSONBigint.parse(data)
    }
    return data
  }]
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 获取用户登录信息
  const TOKEN = window.sessionStorage.getItem('TOKEN')
  // 判断是否有信息
  if (TOKEN) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(TOKEN).token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
//   对响应错误做点什么
  if (error.response && error.response.status === 401) {
    window.location.hash = '/login'
  }
  return Promise.reject(error)
})
export default instance
