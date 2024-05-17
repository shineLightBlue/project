import ReactDOM from 'react-dom'
// 样式文件
import './styles/base.css'
import './styles/index.css'

// 导入 Provider
import { Provider } from 'react-redux'

// 导入 store
import { store } from './store'

import App from './App'

// console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
