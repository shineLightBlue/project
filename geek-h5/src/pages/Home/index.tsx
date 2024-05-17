import { getUserChannel } from '@/store/actions/home'
import { useInitialState } from '@/utils/use-initial-state'
import { Tabs, Popup } from 'antd-mobile'
import Channels from './components/Channels'
import { useState } from 'react'
import { Icon } from '@/components/Icon'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import ArticleList from './components/ArticleList'
import { useHistory } from 'react-router-dom'
const Home = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const onChannelOpen = () => {
        setVisible(true)
    }
    const onChannelClose = () => {
        setVisible(false)
    }
    const { channelActiveKey } = useSelector((state: RootState) => state.home)
    const { userChannel } = useInitialState(getUserChannel, 'home')
    const onTabChange = (key: string) => {
        console.log(key)
        dispatch({ type: 'home/changeTab', payload: key })
    }
    const history = useHistory()
    return (
        <div className={styles.root}>
            {userChannel.length > 0 && (
                <Tabs activeLineMode="fixed" onChange={onTabChange} activeKey={channelActiveKey}>
                    {userChannel.map(item => (
                        <Tabs.Tab forceRender title={item.name} key={item.id}>
                            <ArticleList channelId={item.id}></ArticleList>
                        </Tabs.Tab>
                    ))}
                </Tabs>
            )}
            <div className="tabs-opration">
                <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
                <Icon type="iconbtn_channel" onClick={onChannelOpen}></Icon>
            </div>
            <Popup
                visible={visible}
                onMaskClick={onChannelClose}
                position="left"
                className="channel-popup"
            >
                <Channels onClose={onChannelClose} />
            </Popup>
        </div>

    )
}
export default Home