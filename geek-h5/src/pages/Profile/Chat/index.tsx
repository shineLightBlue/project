import { Input, NavBar } from 'antd-mobile'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import { Icon } from '@/components/Icon'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { getToken } from '@/utils/token'
type ChatType = {
  type: 'xz' | 'user'
  message: string
}
const Chat = () => {
  const socketRef = useRef<Socket>()
  const [chatList, setChatList] = useState<ChatType[]>([])
  const history = useHistory()
  const [value, setValue] = useState('')
  const chatListRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const socketio = io('http://toutiao.itheima.net', {
      query: {
        token: getToken().token
      },
      transports: ['websocket']
    })
    socketio.on('connect', () => {
      console.log('websocket连接成功')
    })
    socketio.on('message', data => {
      console.log(data)
      console.log(chatList)

      setChatList(list => [...list, {
        type: 'xz',
        message: data.msg
      }])
      // setChatList([...chatList, {
      //   type: 'xz',
      //   message: data.msg
      // }])
    })
    socketRef.current = socketio
    return () => { socketio.close() }
  }, [])
  useEffect(() => {
    const chatListDOM = chatListRef.current
    if (!chatListDOM) return
    console.log(chatListDOM.scrollHeight, chatListDOM.scrollTop)
    chatListDOM.scrollTop = chatListDOM.scrollHeight
  }, [chatList])
  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setChatList([...chatList, {
        type: 'user',
        message: value
      }])
      setValue('')
      socketRef.current?.emit('message', {
        msg: value,
        timestamp: Date.now() + ''
      })
    }
  }
  return (
    <div className={styles.root}>
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      <div className="chat-list" ref={chatListRef}>
        {
          chatList.map((item, index) => (
            <div
              key={index}
              className={classnames('chat-item', item.type === 'xz' ? 'self' : 'user')}>
              {item.type === 'xz' ? (
                <Icon type="iconbtn_xiaozhitongxue" />
              ) : (
                <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              )}
              <div className="message">{item.message}</div>
            </div>
          ))
        }

      </div>

      <div className="input-footer">
        <Input className="no-border"
          placeholder="请描述您的问题"
          value={value}
          onChange={val => setValue(val)}
          onKeyDown={onSendMessage} />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
