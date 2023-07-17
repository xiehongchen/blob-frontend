import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  return config
})

const statusMap: { [key: number]: string } = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('err' + error)
    let message = ''
    if (error.response) {
      message = statusMap[error.response.status] || '未知错误'
    } else {
      message = error.message
    }
    ElMessage({
      message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

// console.log(response)
// const res = response.data
// if (res.status !== 200) {
//   ElMessage({
//     message: res.message || 'Error',
//     type: 'error',
//     duration: 5 * 1000,
//   })
//   return Promise.reject(new Error(res.message || 'Error'))
// } else {
//   return res
// }

export default request
