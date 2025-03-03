const path = require('path')
const pxToViewport = require('postcss-px-to-viewport')
const vw = pxToViewport({
    viewportWidth: 375
})
module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
            // 约定：使用 @scss 表示全局 SASS 样式所在路径
            // 在 SASS 中使用
            '@scss': path.resolve(__dirname, 'src/assets/styles')
        }
    },
    style: {
        postcss: {
            plugins: [vw]
        }
    }
}