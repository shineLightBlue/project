// 创建 store 并导出
import { createStore } from 'redux'

// 导入根reducer
import { rootReducer } from './reducers'

// 创建 store 并导出
export const store = createStore(rootReducer)
