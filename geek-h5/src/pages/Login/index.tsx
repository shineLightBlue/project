import { Button, NavBar, Form, Input } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import _ from 'lodash'
import { Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom';
import type { LoginState } from '@/types';
import { login, getCode } from '@/store/actions/login'
import { useLocation } from 'react-router-dom';
type LoginForm = { mobile: string; code: string }
const Login = () => {
  const location = useLocation<{ from: string } | undefined>()
  const mobileRef = useRef<InputRef>(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async (values: LoginForm) => {
    await dispatch(login(values))
    Toast.show({
      content: '登录成功',
      duration: 600,
      afterClose: () => {
        if (location.state) {
          return history.replace(location.state.from)
        }
        // 返回首页
        history.replace('/home')
      }
    })
  }
  const [form] = Form.useForm()
  const [timeLeft, setTimeLeft] = useState(0)
  const timeRef = useRef(-1)
  const onGetCode = () => {
    const mobile = (form.getFieldValue('mobile'))
    const hasError = form.getFieldError('mobile').length > 0
    if (mobile.trim() === '' || hasError) {
      console.log(mobileRef.current)
      return mobileRef.current?.focus()
    }
    setTimeLeft(5)
    timeRef.current = window.setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1)
    }, 1000)
    dispatch(getCode(mobile))
  }
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timeRef.current)
    }
  }, [timeLeft])
  useEffect(() => {
    return () => {
      // 组件卸载时清理定时器
      clearInterval(timeRef.current)
    }
  }, [])
  return (
    <div>
      <NavBar></NavBar>

      <div className="login-form">
        <h2 className="title text">账号登录</h2>

        <Form onFinish={onFinish}
          validateTrigger={['onBlur']}
          initialValues={{
            // 注意 mobile 是字符串类型！！！
            mobile: '13911111111',
            code: '246810'
          }}
          form={form}>
          <Form.Item className="login-item" name="mobile"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入手机号'
              },
              {
                message: '手机号格式错误',
                pattern: /^1[3-9]\d{9}$/
              }
            ]}
          >
            <Input placeholder="请输入手机号" ref={mobileRef} />
          </Form.Item>

          <Form.Item
            className="login-item"
            name="code"
            validateTrigger="onBlur"
            extra={<span className="code-extra"
              onClick={onGetCode}
            >{timeLeft === 0 ? '发送验证码' : `${timeLeft}s后重新获取`}</span>}
            rules={[
              { required: true, message: '请输入验证码' },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误'
              }
            ]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          {/* <Form.Item noStyle shouldUpdate>
            {() => {
              // console.log('登录按钮重新渲染了', form.isFieldsTouched(true))
              // console.log(form.getFieldsError())
              const disabled =
                form.getFieldsError().filter(item => item.errors.length > 0)
                  .length > 0 || !form.isFieldsTouched(true)
              return ( */}
          <Button
            block
            type="submit"
            color="primary"
            className="login-submit"
            // disabled={disabled}
            style={{ '--background-color': 'pink' }}
          >
            提交
          </Button>
          {/* ) */}
          {/* }} */}
          {/* </Form.Item> */}
        </Form>
      </div>
    </div>
  )
}
export default Login