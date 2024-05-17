/**
 * 目标3：用户登录-长度判断案例
 *  3.1 准备用户登录页面
 *  3.2 编写核心 JS 逻辑代码
 *  3.3 打包并手动复制网页到 dist 下，引入打包后的 js，运行
 */
// 3.2 编写核心 JS 逻辑代码
import myAxios from '../utils/request.js'
import { myAlert } from '../utils/alert.js'
import { checkPhone, checkCode } from '@/utils/check.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './index.less'
import imgObj from './assets/1.png'
import imgObj1 from './assets/2.png'
const theImg = document.createElement('img')
const theImg1 = document.createElement('img')
theImg.src = imgObj
theImg1.src = imgObj1
document.querySelector('.login-wrap').appendChild(theImg)
document.querySelector('.login-wrap').appendChild(theImg1)
document.querySelector('.btn').addEventListener('click', () => {
    const phone = document.querySelector('.login-form [name=mobile]').value
    const code = document.querySelector('.login-form [name=code]').value
  
    if (!checkPhone(phone)) {
      console.log('手机号长度必须是11位')
      return
    }
  
    if (!checkCode(code)) {
      console.log('验证码长度必须是6位')
      return
    }
  
    console.log('提交到服务器登录...')
    myAxios({
      url: '/v1_0/authorizations',
      method: 'POST',
      data: {
        mobile: phone,
        code: code
      }
    }).then(res => {
      myAlert(true, '登录成功')
      localStorage.setItem('token', res.data.token)
      location.href = '../content/index.html'
    }).catch(error => {
      myAlert(false, error.response.data.message)
    })
  })
if (process.env.NODE_ENV === 'production') {
    console.log = function() {}
}
console.log('开发模式下好用，生产模式下失效')
