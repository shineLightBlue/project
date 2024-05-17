import { setToken, http, clearToken } from '@/utils'

// 登录
export const login = loginData => {
  return async dispatch => {
    // 异步请求
    // console.log('登录需要的参数：', data)
    const res = await http.post('/authorizations', loginData)
    // console.log('登录结果：', res)
    const {
      data: { token },
      message
    } = res.data
    // 注意： message 的 OK 是大写的
    if (message === 'OK') {
      // 登录成功
      // console.log(token)
      // 1 将登录拿到的 token 保存到 本地缓存 中
      // localStorage.setItem('geek-pc-token', token)
      setToken(token)
      // 2 将 token 存储到 redux 中
      dispatch({ type: 'login/setToken', payload: token })
    }
  }
}

// 退出
export const logout = () => {
  return dispatch => {
    // 1 清除 token
    dispatch({ type: 'login/clearToken' })
    // 清除本地 token
    clearToken()

    // 2 清除个人信息
    dispatch({ type: 'user/clearInfo' })
  }
}
