import axios from "axios";
import Vue from 'vue';
const http = axios.create({
  baseURL:'http://localhost:3000/admin/api'
})

// http.interceptors.request.use(config => {
//   if (localStorage.token) {

//     // 把token赋值到请求头Authorization(授权信息)，后端去调用
//     config.headers.Authorization = 'Bearer ' + (localStorage.token)
//   }
//   return config
// }, error => {
//   return Promise.reject(error);
// })

//响应拦截
http.interceptors.response.use(res => {
  return res
}, err => {
  
  //不是200接口，调用element ui 的 $message
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  return Promise.reject(err)
})
export default http