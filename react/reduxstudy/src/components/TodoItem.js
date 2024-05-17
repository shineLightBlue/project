import classNames from "classnames"
import { useDispatch } from "react-redux"
import { delTodo, toggleTodo, updateTodo } from '../store/actions/todos'
import { useState, useRef, useEffect } from "react"

export const TodoItem = ({ id, text, done }) => {
  const dispatch = useDispatch()
  const [showEdit, setShowEdit] = useState(false)
  const inputRef = useRef(null)
  useEffect(() => {
    if (showEdit) {
      inputRef.current.focus()
    }
  }, [showEdit])
  const [todoName, setTodoName] = useState(text)
  const onBlur = () => {
    // 去掉编辑状态
    setShowEdit(false)
  }
  // 修改任务名称
  const onUpdateTodo = e => {
    if (e.keyCode !== 13) return
    if (todoName.trim() === '') return

    dispatch(updateTodo(id, todoName))

    // 去掉编辑状态
    setShowEdit(false)
  }
  return (
    // 编辑时，添加类名：editing
    <li
      className={classNames({
        completed: done,
        // 编辑状态
        editing: showEdit
      })}
    >
      <div className="view">
        <input className="toggle" type="checkbox" checked={done}
          onChange={e => dispatch(toggleTodo(id, e.target.checked))}
        />
        <label onDoubleClick={() => setShowEdit(true)}>{text}</label>
        <button className="destroy"
          onClick={() => dispatch(delTodo(id))}
        ></button>
      </div>
      <input className="edit" ref={inputRef} onBlur={onBlur}
        value={todoName}
        onChange={e => setTodoName(e.target.value)}
        onKeyDown={onUpdateTodo}
      />
    </li>
  )
}
