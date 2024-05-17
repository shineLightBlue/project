import { useDispatch, useSelector } from "react-redux"
import { clearAll } from '../store/actions/todos'
import { changeFilter } from '../store/actions/filter'
import classNames from 'classnames'

export const TodoFooter = () => {
  const dispatch = useDispatch()

  const leftCount = useSelector(
    state => state.todos.filter(item => !item.done).length
  )
  const doneCount = useSelector(
    state => state.todos.filter(item => item.done).length
  )
  const filter = useSelector(state => state.filter)
  console.log('Footer:', filter)
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftCount}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a
            className={classNames({
              selected: filter === 'all'
            })}
            href="#/"
            onClick={() => dispatch(changeFilter('all'))}>
            All
          </a>
        </li>
        <li>
          <a
            className={classNames({
              selected: filter === 'active'
            })}
            href="#/"
            onClick={() => dispatch(changeFilter('active'))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={classNames({
              selected: filter === 'completed'
            })}
            href="#/"
            onClick={() => dispatch(changeFilter('completed'))}
          >
            Completed
          </a>
        </li>
      </ul>
      {doneCount > 0 && (
        <button
          className="clear-completed"
          onClick={() => dispatch(clearAll())}
        >
          Clear completed
        </button>
      )}
    </footer>
  )
}
