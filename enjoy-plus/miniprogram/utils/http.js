import http from 'wechat-http'
http.baseURL = 'https://live-api.itheima.net'
http.intercept.response = async function ({
  data,
  config
}) {
  console.log(config)
  if (data.code === 401) {
    const app = getApp()
    if (config.url.includes('/refreshToken')) {
      const pageStack = getCurrentPages()
      const currentPage = pageStack.pop()
      const redirectURL = currentPage.route
      return wx.redirectTo({
        url: '/pages/login/index?redirectURL=/' + redirectURL,
      })
    }
    const res = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        Authorization: 'Bearer ' + app.refreshToken
      }
    })
    if (res.code !== 10000) return wx.utils.toast('更新token失败!')
    app.setToken('token', res.data.token)
    app.setToken('refreshToken', res.data.refreshToken)
    config = Object.assign(config, {
      header: {
        Authorization: 'Bearer ' + res.data.token
      }
    })
    return http(config)
  }
  return data
}
http.intercept.request = function (options) {
  const defaultHeader = {}
  defaultHeader.Authorization = 'Bearer ' + getApp().token
  options.header = Object.assign({}, defaultHeader, options.header)
  return options
}
wx.http = http
export default http