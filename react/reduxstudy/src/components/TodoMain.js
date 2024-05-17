import { useDispatch, useSelector } from 'react-redux'
import { TodoItem } from './TodoItem'
import { toggleAll } from '../store/actions/todos'

export const TodoMain = () => {
  const todos = useSelector(state => {
    if (state.filter === 'active') {
      return state.todos.filter(item => !item.done)
    } else if (state.filter === 'completed') {
      return state.todos.filter(item => item.done)
    } else {
      return state.todos
    }
  })
  const dispatch = useDispatch()
  const checkAll = todos.every(item => item.done)
  console.log(checkAll)
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox"
        checked={checkAll}
        onChange={e => dispatch(toggleAll(e.target.checked))}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(item => (
          <TodoItem key={item.id} {...item} />
        ))}
      </ul>
    </section>
  )
}
