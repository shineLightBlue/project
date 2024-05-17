import classnames from 'classnames'
import { useState } from 'react'
import { Icon } from '@/components/Icon'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { useInitialState } from '@/utils/use-initial-state'
import { getAllChannel } from '@/store/actions/home'
import { Channel } from '@/types/data'
import { delChannel, addChannel } from '@/store/actions/home'

type Props = {
  onClose: () => void
}
const Channels = ({ onClose }: Props) => {
  console.log('channel')
  const { userChannel, channelActiveKey } = useSelector((state: RootState) => state.home)
  const { restChannel } = useInitialState(getAllChannel, 'home')
  const [isEdit, setIsEdit] = useState(false)
  const onChangeEdit = () => {
    setIsEdit(!isEdit)
  }
  const dispatch = useDispatch()
  const onChannelClick = (channel: Channel) => {
    console.log(channel)
    if (!isEdit) {
      console.log(channel)
      dispatch({ type: 'home/changeTab', payload: channel.id + '' })
      onClose()
      return
    }
    if (channel.id === 0) return
    if (userChannel.length <= 4) return
    dispatch(delChannel(channel))
  }
  const onAddChannel = (channel: Channel) => {
    dispatch(addChannel(channel))
  }
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit" onClick={onChangeEdit}>{isEdit ? '保存' : '编辑'}</span>
          </div>
          <div className="channel-list">
            {userChannel.map(item => (
              <span key={item.id} className={classnames(
                'channel-list-item',
                channelActiveKey === item.id + '' && 'selected')}
                onClick={() => onChannelClick(item)}>
                {item.name}
                <Icon type="iconbtn_tag_close"></Icon>
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannel.map(item => (
              <span key={item.id} className='channel-list-item'
                onClick={() => onAddChannel(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
