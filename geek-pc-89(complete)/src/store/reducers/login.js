// login 模块，只需要存储 token 状态值，所以，此处默认值给 '' 空字符即可
const initialState = ''

export const login = (state = initialState, action) => {
  switch (action.type) {
    // 设置 token
    case 'login/setToken':
      return action.payload

    // 清除 token
    case 'login/clearToken':
      return initialState
    default:
      return state
  }
}
