const initialState = {}

export const user = (state = initialState, action) => {
  switch (action.type) {
    // 设置 个人信息
    case 'user/getInfo':
      return action.payload

    // 清除 个人信息
    case 'user/clearInfo':
      return initialState
    default:
      return state
  }
}
