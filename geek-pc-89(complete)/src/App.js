import { lazy, Suspense } from 'react'
import { Spin } from 'antd'

import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { customHistory } from '@/utils'

import './App.scss'

import { AuthRoute } from '@/components/AuthRoute'

// 导入页面
const Layout = lazy(() => import('./pages/Layout'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  return (
    <Router history={customHistory}>
      {/* 使用 Suspense 包裹所有内容*/}
      <Suspense
        fallback={
          <div className="loading">
            <Spin tip="加载中..." />
          </div>
        }
      >
        <div className="app">
          <Switch>
            {/* 
              exact 表示：让路由变为精确匹配，也就是只有当路由地址为 / 才匹配
              当前路由用来实现重定向功能：也就是在进入项目时，就匹配默认路由，然后，直接重定向到 /home 页面
            */}
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            {/* <Route path="/home" component={Layout} /> */}
            {/* 使用 AuthRoute 组件 */}
            <AuthRoute path="/home" component={Layout} />
            <Route path="/login" component={Login} />

            {/* 404 */}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
