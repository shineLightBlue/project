const { createProxyMiddleware } = require('http-proxy-middleware')

// 从配置好的环境变量文件中，读取接口地址
const baseURL = process.env.REACT_APP_URL

module.exports = function (app) {
  app.use(
    // 代理标识
    '/api',
    // 代理配置
    createProxyMiddleware({
      // 目标服务器地址
      target: baseURL,
      changeOrigin: true,
      pathRewrite: {
        // 去掉接口中的 /api 前缀
        '^/api': ''
      }
    })
  )
}
