import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '@/utils'

// 要求：
//  1 AuthRoute 和 Route 组件一样
//    Route 用法：
//      <Route path="/home" component={Home} excat render />
//    AuthRoute 用法：
//      <AuthRoute path="/home" component={Home} />
// export const AuthRoute = ({ ...rest }) => {
//   // ES6 中的剩余参数语法：{ ...rest } 表示获取到函数接收到的所有参数
//   console.log('AuthRoute 剩余参数：', rest)
//   return <Route {...rest} />
// }

//  2 登录判断
//  Route 组件是通过 component 属性来指定路由规则匹配时，要渲染的组件的
//  所以，如果不处理，那么路由规则匹配时，就会自动渲染 component 属性指定的组件了
//  但是，我们的需求是：只在登录时，才渲染 component 指定的属性
//  所以，我们将 component 属性，从 所有的参数 中，单独提取出来，然后，由我们自己决定什么时候渲染 component
export const AuthRoute = ({ component: Component, ...rest }) => {
  // ES6 中的剩余参数语法：{ ...rest } 表示获取到函数接收到的所有参数
  // { component, ...rest } 表示：从传递给该函数的所有参数中，单独拿出 component 属性，
  //                             然后，其他所有的参数放在了 rest 中
  // console.log('AuthRoute 剩余参数：', rest)
  return (
    <Route
      {...rest}
      render={props => {
        // console.log('Route render props:', props)
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
