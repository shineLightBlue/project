import React from 'react'
import ReactDOM from 'react-dom'

// 导入 antd 组件库的样式文件
import 'antd/dist/antd.css'
import './index.scss'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

// 中文设置：
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </Provider>,
  document.querySelector('#root')
)
