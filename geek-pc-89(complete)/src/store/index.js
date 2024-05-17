import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'

import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import { getToken } from '@/utils/token'

let middlewares
// 判断是否为生产环境
if (process.env.NODE_ENV === 'production') {
  // 生产环境
  middlewares = applyMiddleware(thunk)
} else {
  // 开发环境
  const { composeWithDevTools } = require('redux-devtools-extension')
  middlewares = composeWithDevTools(applyMiddleware(thunk))
}

// 为了在刷新页面时，也能够让 redux 拿到 token 值，可以为 createStore 指定默认值参数
const initialState = {
  // login: localStorage.getItem('geek-pc-token')
  login: getToken()
}

// 创建 store
const store = createStore(rootReducer, initialState, middlewares)

export default store
