import { useSelector, useDispatch } from 'react-redux'

// actions：
import { increment, decrement } from './store/actions/counter'

const App = () => {
  // 调用 useSelector hook 来获取 redux 状态
  const count = useSelector(state => state)
  // 导入 dispatch 函数
  // 此处的 dispatch 函数就相当于 store.dispatch
  // 所以，要想修改状态，只需要 分发 action 即可
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
