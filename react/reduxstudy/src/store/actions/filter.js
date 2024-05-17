// 创建展示不同状态任务的 action
import * as types from '../actionTypes/filter'

export const changeFilter = filter => ({
  type: types.CHANGE_FILTER,
  payload: filter
})
