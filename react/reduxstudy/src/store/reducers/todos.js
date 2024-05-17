import * as types from '../actionTypes/todos'
// 创建 todos 的 reducer
const initialState = [
  { id: 1, text: '吃饭', done: true },
  { id: 2, text: '学习', done: false },
  { id: 3, text: '睡觉', done: true }
]

export const todos = (state = initialState, action) => {
  switch (action.type) {
    // 删除任务
    case types.DEL_TODO:
      return state.filter(item => item.id !== action.payload)
    case types.TOGGLE_TODO:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            done: action.payload.checked
          }
        }
        return item
      })
    // 添加任务
    case types.ADD_TODO:
      const id = state.length === 0 ? 1 : state[state.length - 1].id + 1
      return [
        ...state,
        {
          id,
          text: action.payload,
          done: false
        }
      ]
    case types.TOGGLE_ALL:
      console.log(action)
      return state.map(item => {
        return {
          ...item,
          done: action.payload
        }
      })
    // 清除已完成
    case types.CLEAR_ALL:
      return state.filter(item => !item.done)
    case types.UPDATE_TODO:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text
          }
        }
        return item
      })
    default:
      return state
  }
}
