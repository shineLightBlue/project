import * as types from '../actionTypes/filter'

export const filter = (state = 'all', action) => {
  if (action.type === types.CHANGE_FILTER) {
    // 因为我们希望点击哪个按钮，就让状态的值变为那个按钮提供的 状态
    // 所以，直接将 action.payload 返回即可
    // action.payload 的值：'all' / 'active' / 'completed'
    return action.payload
  }

  return state
}
