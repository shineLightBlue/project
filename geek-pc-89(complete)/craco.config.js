// @craco/craco 的配置文件：
const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
// 优化 antd 中的moment
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = {
  // 对 webpack 的配置项进行修改
  webpack: {
    // alias 表示要修改 别名
    alias: {
      // 进行该配置以后，就可以在代码中，使用 @ 来表示 src 目录
      '@': path.resolve(__dirname, 'src')
    },

    // 通过 craco 为 webpack 添加插件
    plugins: {
      add: [new AntdDayjsWebpackPlugin()]
    },

    configure: webpackConfig => {
      // 生产环境下，配置 externals
      webpackConfig.externals = whenProd(
        () => ({
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'react-router-dom': 'ReactRouterDOM'
        }),
        {}
      )

      // 拿到 HtmlWebpackPlugin 插件
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      // 生产环境下，暴露 CDM 链接到模板页面中
      if (isFound) {
        // match 表示当前匹配的插件 HtmlWebpackPlugin
        // 通过 options 将额外的数据添加给 HtmlWebpackPlugin 插件
        // options 可以传递任意数据，比如，此处我们自己写的 cdn 就是要额外传递的数据
        match.options.cdn = {
          // js 链接
          js: whenProd(
            () => [
              'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
              'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
              'https://cdn.bootcdn.net/ajax/libs/redux/4.1.2/redux.min.js',
              'https://cdn.bootcdn.net/ajax/libs/react-router-dom/5.3.0/react-router-dom.min.js'
            ],
            []
          ),
          // css 链接
          css: []
        }
      }

      return webpackConfig
    }
  }
}
