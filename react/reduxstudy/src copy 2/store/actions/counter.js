// action creator：函数，通过函数来创建 action 对象
//  1 计数器数值增加，增加多少不确定
export const increment = payload => ({ type: 'increment', payload })

//  2 计数器数值减少，减少多少不确定
export const decrement = payload => {
  return { type: 'decrement', payload }
}
