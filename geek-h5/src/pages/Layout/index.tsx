import { TabBar } from 'antd-mobile'
import { Icon } from '@/components/Icon'
import { RouteProps, useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import Home from '../Home'
import Question from '../Question'
import Video from '../Video'
import Profile from '../Profile'
import { Route, Switch } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { AuthRoute1 } from '@/components/AuthRoute1'
import { KeepAlive } from '@/components/KeepAlive'
const My = ({ children, ...rest }: RouteProps) => {
    console.log(children, rest)
    return (
        <Route render={() => {
            return children as React.ReactNode
        }} />
    )
}
const You = (props: RouteProps) => {
    console.log(props)
    return <div>You</div>
}
const Layout = () => {
    const tabs = [
        { path: '/home', text: '首页', icon: 'iconbtn_home' },
        { path: '/home/question', text: '问答', icon: 'iconbtn_qa' },
        { path: '/home/video', text: '视频', icon: 'iconbtn_video' },
        { path: '/home/profile', text: '我的', icon: 'iconbtn_mine' }
    ]
    const history = useHistory()
    const location = useLocation()

    // 点击每个 TabBar 切换路由
    const changeRoute = (key: string) => {
        // console.log(key)
        history.push(key)
    }
    return <div className={styles.root}>
        {/* <Switch> */}
        {/* <Route exact path="/home"> */}
        <KeepAlive exact path="/home">
            <Home></Home>
        </KeepAlive>
        {/* <Route exact path="/home">
            <Home></Home>
        </Route> */}
        <Route path="/home/question" component={Question}>
        </Route>
        <Route path="/home/video" component={Video}>
        </Route>
        <AuthRoute path="/home/profile">
            <Profile></Profile>
        </AuthRoute>
        {/* </Switch> */}
        <TabBar
            className="tab-bar"
            onChange={changeRoute}
            activeKey={location.pathname}
        >
            {tabs.map(item => (
                <TabBar.Item
                    key={item.path}
                    title={item.text}
                    icon={active => (
                        <Icon type={active ? `${item.icon}_sel` : item.icon} />
                    )}
                />
            ))}
        </TabBar>
    </div>
}
export default Layout