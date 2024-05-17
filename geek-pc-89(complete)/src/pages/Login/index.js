import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
// import { login } from '@/store/actions/login'
import { login } from '@/store/actions'
import { useHistory, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // 表单提交：
  const onFinish = async values => {
    try {
      // 将登录需要的 手机号码 和 验证码 传递给 login action
      await dispatch(login({ mobile: values.mobile, code: values.code }))

      // 成功提示：
      // 第一个参数：提示内容
      // 第二个参数：提示内容的展示的持续时间
      // 第三个参数：提示完成后的关闭回调，会在提示结束后，立即执行
      message.success('登录成功', 1.5, () => {
        // 登录成功后，跳转到首页
        // console.log(location.state?.from ?? '/home')
        // 如果是重定向到的登录页面，就直接返回原来要访问的页面
        // 如果不是，就说明直接访问的登录页面，此时，就默认进入 首页 即可
        history.replace(location.state?.from ?? '/home')
      })
    } catch (e) {
      if (!e.response) {
        // 没有响应信息，说明请求超时
        message.warning('网络繁忙，请稍后再试')
      } else {
        // message.warning(e.response && e.response.data.message)
        message.warning(e.response?.data?.message || '好像出错了~')
      }
    }
  }

  return (
    <div className={styles.root}>
      <Card
        className="login-wrapper"
        bordered={false}
        bodyStyle={{
          padding: 20
        }}
      >
        <img className="logo" src={logo} alt="" />

        <Form
          size="large"
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remeber: true
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '手机号为必填项'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不正确',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input maxLength={11} placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '验证码为必填项'
              },
              {
                len: 6,
                message: '验证码格式不正确',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input maxLength={6} placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item name="remeber" valuePropName="checked">
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item
            style={{
              marginBottom: 0
            }}
          >
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
