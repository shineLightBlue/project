import { Component, createRef } from "react";
import avatar from './images/avatar.png'
import moment from 'moment'
const state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
        {
            id: 1,
            name: '热度',
            type: 'hot'
        },
        {
            id: 2,
            name: '时间',
            type: 'time'
        }
    ],
    active: 'hot',
    list: [
        {
            id: 1,
            author: '刘德华',
            comment: '给我一杯忘情水',
            time: new Date('2021-10-10 09:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 1
        },
        {
            id: 2,
            author: '周杰伦',
            comment: '哎哟，不错哦',
            time: new Date('2021-10-11 09:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: 0
        },
        {
            id: 3,
            author: '五月天',
            comment: '不打扰，是我的温柔',
            time: new Date('2021-10-11 10:09:00'),
            // 1: 点赞 0：无态度 -1:踩
            attitude: -1
        }
    ],

    // textarea 的 value 值
    txt: ''
}
class Comments extends Component {
    txtRef = createRef()
    state = state
    formatTime = time => {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
    changeTxt = e => {
        this.setState({
            txt: e.target.value
        })
    }
    addComment = () => {
        const { txt, list } = this.state
        if (txt.trim() === '') {
            return this.txtRef.current.focus()
        }
        const id = list.length === 0 ? 1 : list[list.length - 1].id + 1
        const newList = [
            {
                id,
                author: '89 吴彦祖',
                comment: this.state.txt,
                time: new Date(),
                attitude: 0
            },
            ...list
        ]
        this.setState({
            list: newList,
            txt: ''
        })
    }
    delComment = id => {
        const newList = this.state.list.filter(item => item.id !== id)
        this.setState({
            list: newList
        })
    }
    changeAttitude = (id, attitude) => {
        console.log(attitude)
        const newList = this.state.list.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    attitude
                }
            }
            return item
        })
        this.setState({
            list: newList
        })
    }
    changeActive = active => {
        this.setState({
            active
        })
    }
    render() {
        const { tabs, active, list, txt } = this.state
        return (
            <div className="App">
                <div className="comment-container">
                    {/* 评论数 */}
                    <div className="comment-head">
                        <span>{list.length} 评论</span>
                    </div>
                    {/* 排序 */}
                    <div className="tabs-order">
                        <ul className="sort-container">
                            {tabs.map(item => (
                                <li key={item.id} className={item.type === active ? 'on' : ''}
                                    onClick={() => this.changeActive(item.type)}>
                                    按{item.name}排序
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 添加评论 */}
                    <div className="comment-send">
                        <div className="user-face">
                            <img className="user-head" src={avatar} alt="" />
                        </div>
                        <div className="textarea-container">
                            <textarea
                                cols="80"
                                rows="5"
                                placeholder="发条友善的评论"
                                className="ipt-txt"
                                value={txt}
                                ref={this.txtRef}
                                onChange={this.changeTxt}
                            />
                            <button className="comment-submit" onClick={this.addComment}>
                                发表评论
                            </button>
                        </div>
                        <div className="comment-emoji">
                            <i className="face"></i>
                            <span className="text">表情</span>
                        </div>
                    </div>

                    {/* 评论列表 */}
                    <div className="comment-list">
                        {/* 
                    list-item 是评论列表项
                  */}
                        {list.map(item => (
                            <div key={item.id} className="list-item">
                                <div className="user-face">
                                    <img className="user-head" src={avatar} alt="" />
                                </div>
                                <div className="comment">
                                    <div className="user">{item.author}</div>
                                    <p className="text">{item.comment}</p>
                                    <div className="info">
                                        {/* <span className="time">{+item.time}</span> */}
                                        {/* <span className="time">
                            {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                          </span> */}
                                        <span className="time">{this.formatTime(item.time)}</span>
                                        {/* 赞 */}
                                        <span
                                            // className={item.attitude === 1 ? 'like liked' : 'like'}
                                            className={`like ${item.attitude === 1 ? 'liked' : ''}`}
                                            onClick={() => this.changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}
                                        >
                                            <i className="icon" />
                                        </span>
                                        {/* 踩 */}
                                        <span
                                            className={item.attitude === -1 ? 'hate hated' : 'hate'}
                                            onClick={() => this.changeAttitude(item.id, item.attitude === -1 ? 0 : 1)}
                                        >
                                            <i className="icon" />
                                        </span>
                                        <span className="reply btn-hover" onClick={() => this.delComment(item.id)}>删除</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default Comments