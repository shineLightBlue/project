import { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './index.module.scss'

const NotFound = () => {
  const [count, setCount] = useState(5)
  const timerRef = useRef(-1)
  const history = useHistory()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      // console.log('定时器在执行')
      setCount(count => count - 1)
    }, 1000)

    // 因为依赖项为空数组，所以，该返回的清理函数，只会在组件卸载时执行
    return () => {
      // console.log('404 页面卸载')
      clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (count === 0) {
      history.replace('/home')
    }
  }, [count, history])

  return (
    <div className={styles.root}>
      <h1>对不起，您访问的页面不存在~</h1>
      <p>
        将在 {count} 秒后，返回首页（或者：点击立即返回
        <Link to="/home">首页</Link>）
      </p>
    </div>
  )
}

export default NotFound
