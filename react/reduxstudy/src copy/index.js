import ReactDOM from 'react-dom'
// 导入 Provider 组件
import { Provider } from 'react-redux'
// 导入创建好的 store
import store from './store'

import App from './App'

// 全局配置 react-redux，配置后，项目中任何一个组件中，
// 都可以直接接入 redux 来进行状态管理了
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
