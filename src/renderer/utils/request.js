import axios from 'axios'

const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development'? '':'',
    baseURL: 'http://112.74.169.96:8990',
    timeout: 5000 // request timeout
})

// request interceptor
// service.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//     if (localStorage.Authorization) {
//       config.headers = {
//         'Authorization': 'Bearer ' + getToken(),
//         'locale': localStorage.getItem('locale')
//       }
//     } else {
//       config.headers = {
//         'locale': localStorage.getItem('locale')
//       }
//     }

//     return config
//   },
//   error => {
//     Message({
//       showClose: true,
//       message: error && error.data.error.message,
//       type: 'error'
//     })
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
    response => response.data,
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
)

export default service