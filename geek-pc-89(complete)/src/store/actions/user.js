import { http } from '@/utils'

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return async dispatch => {
    const res = await http.get('/user/profile')

    // 将接口返回的数据存储到 redux 中
    dispatch({ type: 'user/getInfo', payload: res.data.data })
  }
}
