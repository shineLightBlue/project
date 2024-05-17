// 使用常量来存储 key
const GEEK_TOKEN_KEY = 'geek-pc-token'

// 创建 获取 token
export const getToken = () => localStorage.getItem(GEEK_TOKEN_KEY)
// export const getToken = () => {
//   return localStorage.getItem(GEE_TOKEN_KEY)
// }

// 创建 设置 token
export const setToken = token => localStorage.setItem(GEEK_TOKEN_KEY, token)

// 创建 清除 token
export const clearToken = () => localStorage.removeItem(GEEK_TOKEN_KEY)

// 创建 根据 token 判断是否登录
// 简单处理：如果有 token 就认为登录了
// 我们希望 isAuth() 函数的返回值是 布尔值，如果为 true 表示已登录；为 false 表示未登录
// !! 用来将其他类型，转化为 布尔值 类型（ 两次取反，负负得正 ，就是转成对应的 布尔值）
export const isAuth = () => !!getToken()
