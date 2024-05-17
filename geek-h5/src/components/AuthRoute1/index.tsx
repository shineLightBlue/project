//
// AuthRoute 组件的使用，与 路由自己的 Route 组件用法相同
// 也就是说：Route 能够接受什么属性，AuthRoute 组件也能够接受什么属性
// <Route path="" component={Home} />

import { logout } from '@/store/actions/login'
import { isAuth } from '@/utils/token'
import { useDispatch } from 'react-redux'
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'

/*
  <Route path="">
    <Home />
  </Route>

  注意：此处的 children 就是 <Home />，也就是一个渲染好的组件了
      所以，此处，直接返回 children 即可。因为已经渲染过了内容，所以，此处不需要再通过标签来渲染了
*/
export const AuthRoute1 = ({ component: Component, ...rest }: any) => {
    console.log(Component, rest)
    const location = useLocation()
    // console.log(location)
    return (
        <Route
            {...rest}
            render={props => {
                console.log('Route render props:', props)
                // 判断是否登录
                const isLogin = isAuth()
                if (isLogin) {
                    // 如果登录，就渲染上面拿到的 component
                    return <Component />
                } else {
                    // 如果没有登录，就重定向到 登录页面
                    // return <Redirect to="/login" />
                    return (
                        <Redirect
                            to={{
                                // 重定向时要重定向到哪个页面的地址
                                pathname: '/login',
                                // state 表示：在路由跳转的时候，携带的额外数据
                                //  注意：携带任意数据，比如，此处使用对象数据
                                state: {
                                    from: props.location.pathname
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )
}
