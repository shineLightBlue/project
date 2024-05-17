import ReactDOM from 'react-dom'
import './styles/index.css'
// 导入 Comments 组件
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))