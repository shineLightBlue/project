// store 的入口文件
// 作用：创建 store

import { createStore } from 'redux'
import reducer from './reducers/counter'

// 创建 store
const store = createStore(reducer)

// 导出创建好的 store
export default store
