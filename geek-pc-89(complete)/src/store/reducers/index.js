import { combineReducers } from 'redux'

// 导入子 reducer
import { login } from './login'
import { user } from './user'
import { article } from './article'

export const rootReducer = combineReducers({
  login,
  user,
  article
})
