/**
 * 目标1：体验 webpack 打包过程
 */
// 1.1 准备项目和源代码
import { checkPhone, checkCode } from './utils/check.js'
console.log(checkPhone('13900002020'))
console.log(checkCode('123123123123'))
// 1.2 准备 webpack 打包的环境
// 1.3 运行自定义命令打包观察效果（npm run 自定义命令）