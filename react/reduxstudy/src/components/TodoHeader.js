import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from '../store/actions/todos'

export const TodoHeader = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const onAddTodo = e => {
    if (e.keyCode !== 13) return
    if (text.trim() === '') return

    dispatch(addTodo(text))
    // 清空文本框的值
    setText('')
  }
  return (
    <header className="header">
      {/* <h1>todos</h1> */}
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onAddTodo}
      />
    </header>
  )
}
