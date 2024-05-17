// 封装 axios
import axios from 'axios'
import store from '@/store'
import { message } from 'antd'
import { customHistory } from './history'
import { logout } from '@/store/actions'

// 获取环境变量中配置的 url 地址
// 注意：这段代码仅仅是为了本地演示使用
const baseURL =
  process.env.NODE_ENV === 'development' ? '/api' : process.env.REACT_APP_URL

const http = axios.create({
  // baseURL: 'http://geek.itheima.net/v1_0',
  // baseURL: 'http://toutiao.itheima.net/v1_0',

  // 如果本地开发服务器和线上的真正服务器都统一代理了 /api，那么，此处就直接使用 /api 即可
  // baseURL: '/api',
  baseURL,
  timeout: 5000
})

// 将来可以继续进行 拦截器 的处理

// 请求拦截器
http.interceptors.request.use(config => {
  // 获取token
  const { login: token } = store.getState()

  // 除了登录请求外，其他请求统一添加 token
  if (!config.url.startsWith('/authorizations')) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// 响应拦截器
// 因为现在只需要处理 请求失败的情况，所以，第一个参数（请求成功的回调）就不需要处理
// 所以，直接传入 undefined 即可
http.interceptors.response.use(undefined, error => {
  // 响应失败时，会执行此处的回调函数
  if (!error.response) {
    // 网路超时
    message.error('网络繁忙，请稍后再试')
    return Promise.reject(error)
  }

  if (error.response.status === 401) {
    // 说明 token 过期了，登录超时，此时，就让重定向到登录页面，让用户重新登录
    message.error('登录超时，请重新登录', 1, () => {
      // push() 也可以通过第二个参数来指定路由跳转时携带的额外的信息
      customHistory.push('/login', {
        from: customHistory.location.pathname
      })

      // 触发退出 action，将 token 等清除
      store.dispatch(logout())
    })
  }

  // Promise.reject() 是 Promise 提供一个快捷方法，可以直接得到一个 失败的 Promise 对象
  return Promise.reject(error)
})

// 补充：
// Promise.reject(error) 直接得到一个失败的 Promise 对象
// 相当于：
// new Promise((resolve, reject) => {
//   reject(error)
// })

// Promise.resolve(data) 直接得到一个成功的 Promise 对象
// 相当于：
// new Promise((resolve, reject) => {
//   resolve(data)
// })

// 什么情况下使用快捷方法，什么情况使用 new Promise() 的方式？
// 如果直接有 成功的数据 或者 失败的错误对象，那么，就使用快捷方法（Promise.resolve 或 Promise.reject）
// 如果是需要经过一些逻辑判断等处理后，才能知道是否发生错误，此时，就自己创建一个 Promise 对象，也就是
// 使用 new Promise() 的形式

// 按需导出
export { http }
