import { TodoHeader } from './components/TodoHeader'
import { TodoMain } from './components/TodoMain'
import { TodoFooter } from './components/TodoFooter'

const App = () => {
  return (
    <section className="todoapp">
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </section>
  )
}

export default App
