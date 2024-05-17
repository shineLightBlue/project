// 导入创建 store 的函数
import { createStore } from 'redux'

// actions：

// action creator：函数，通过函数来创建 action 对象
//  1 计数器数值增加，增加多少不确定
const increment = payload => ({ type: 'increment', payload })

//  2 计数器数值减少，减少多少不确定
const decrement = payload => {
  return { type: 'decrement', payload }
}

// 创建 reducer： 处理 action 修改状态
// 第一个参数：上一次的状态值
// 第二个参数：action
// 如何为 redux 状态设置默认值：为 reducer 的 state 参数设置默认值即可
//
// 注意：
//  在创建 store 的时候，就会自动调用一次 reducer
//  本次调用 reducer 是这样调用：
//  reducer(undefined, { type: "@@redux/INITg.g.1.d.2.m" })
const reducer = (state = 0, action) => {
  console.log('reducer 执行了，state为:', state, 'action为：', action)
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

// 创建 store
// 参数：reducer
const store = createStore(reducer)

// 导出创建好的 store
export default store
