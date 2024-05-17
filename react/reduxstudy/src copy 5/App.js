import Home from './pages/Home'
import Search from './pages/Search'
import Comment from './pages/Comment'
import { useEffect, useState } from 'react'

export default function App() {
    console.log(window.location.hash)
    console.log(window.location.hash.slice(1))
    const [path, setPath] = useState(window.location.hash.slice(1))
    console.log(path)
    useEffect(() => {
        const handleHashChange = () => {
            setPath(window.location.hash.slice(1))
        }

        // 给 window 绑定 hashchange 事件，
        // 来监听浏览器地址栏中 # 后面内容的变化，也就是 hash 改变
        window.addEventListener('hashchange', handleHashChange)

        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [])

    return (
        <div>
            <ul>
                <li>
                    <a href="#/home">首页</a>
                </li>
                <li>
                    <a href="#/comment">评论</a>
                </li>
                <li>
                    <a href="#/search">搜索</a>
                </li>
            </ul>

            <div>
                {path === '/home' && <Home></Home>}
                {path === '/search' && <Search></Search>}
                {path === '/comment' && <Comment></Comment>}
            </div>
        </div>
    )
}
