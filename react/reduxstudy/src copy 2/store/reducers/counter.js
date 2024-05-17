const reducer = (state = 0, action) => {
  switch (action.type) {
    // 增加：
    case 'increment':
      return state + action.payload
    // 减少：
    case 'decrement':
      return state - action.payload
    default:
      return state
  }
}

// 导出
export default reducer
