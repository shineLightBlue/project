import { lazy } from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Route, Link, useLocation, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, logout } from '@/store/actions'

// 导入 CSSModules 文件
import styles from './index.module.scss'

const Home = lazy(() => import('../Home'))
const Article = lazy(() => import('../Article'))
const Publish = lazy(() => import('../Publish'))

const { Header, Sider } = Layout

const GeekLayout = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { name } = useSelector(state => state.user)
  // 拿到当前路由地址

  // 需要对 /home/publish/8205 URL 地址进行特殊处理
  // 最终处理后的结果，应该是让 key 值为 /home/publish 的菜单高亮
  // 只需要让 此处拿到的 menuSelectedKey 与 菜单的key 相同，所以，就判断当前的 URL 地址
  // 是不是以 /home/publish 开头，如果是，就让 menuSelectedKey 值为 /home/publish
  const menuSelectedKey = location.pathname.startsWith('/home/publish')
    ? '/home/publish'
    : location.pathname

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  // 退出：
  const onLogout = () => {
    // 执行退出时的清理操作
    dispatch(logout())

    // 返回登录页面
    history.push('/login')
  }

  return (
    <Layout className={styles.root}>
      {/* 头部 - 横向通栏 */}
      <Header className="header">
        <div className="logo" />

        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // 注意： defaultSelectedKeys 属性，只会在组件第一次渲染时生效
            //       但是，当 menuSelectedKey 改变时，那么，虽然 menuSelectedKey 值边了，
            //       但是，defaultSelectedKeys 不再生效，因此，菜单高亮就出问题了
            // defaultSelectedKeys={[menuSelectedKey]}
            selectedKeys={[menuSelectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/home">
              <Link to="/home">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/home/article">
              <Link to="/home/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/home/publish">
              <Link to="/home/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Route exact path="/home" component={Home} />
          <Route path="/home/article" component={Article} />

          {/* 
            /home/publish/:id 其中 :id 表示路由参数，这个路由可以匹配以下格式的 URL 地址：
            /home/publish/123
            /home/publish/abc

            /home/publish/:id? 其中 ? 表示当前路由参数是可选的，那也就是可以有参数，也可以没有
            所以，当前路由规则可以匹配以下格式的 URL 地址：
            /home/publish       ===> 发布文章的 URL 地址
            /home/publish/123   ===> 编辑文章时的 URL 地址
            /home/publish/abc
          */}
          <Route path="/home/publish/:id?" component={Publish} />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
