import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from 'react-router-dom'

// 创建组件
const First = () => {
    return <p>这是第一个页面的内容 First</p>
}
const Search = () => {
    return <p>搜索组件</p>
}
const NotFound = () => {
    return <h3>您访问的页面不存在</h3>
}
const Home = () => {
    return <div>我是 Home 组件</div>
}

const App = () => {
    return (
        <>
            <Router>
                <div>
                    <h1>React 路由的基本使用</h1>

                    <ul>
                        <li>
                            <NavLink to="/first">第一个页面</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/search">
                                搜索页面
                            </NavLink>
                        </li>
                    </ul>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/search" component={Search}></Route>
                        <Route path="/first">
                            <First />
                        </Route>

                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    )
}

export default App
