import { useDispatch, useSelector } from 'react-redux'
// actions：

// action creator：函数，通过函数来创建 action 对象
//  1 计数器数值增加，增加多少不确定
const increment = payload => ({ type: 'increment', payload })

//  2 计数器数值减少，减少多少不确定
const decrement = payload => {
  return { type: 'decrement', payload }
}
const App = () => {
  // 调用 useSelector hook 来获取 redux 状态
  const count = useSelector(state => state)
  // console.log('获取到 redux 的状态为：', count)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>计数器：{count}</h1>
      <button onClick={() => dispatch(increment(2))}>数值增加</button>
      <button onClick={() => dispatch(decrement(5))}>数值减少</button>
    </div>
  )
}

export default App
