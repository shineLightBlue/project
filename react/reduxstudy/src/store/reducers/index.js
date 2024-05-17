// 合并 reducer 为一个 根reducer
import { combineReducers } from 'redux'

// 导入子 redcuer
import { todos } from './todos'
import { filter } from './filter'

// 创建 根reducer 并导出
export const rootReducer = combineReducers({
  todos,
  filter
})
