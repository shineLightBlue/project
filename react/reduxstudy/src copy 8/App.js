import { Component, createRef } from "react";
import avatar from './images/avatar.png'
import Tabs from "./components/Tabs";
import Form from "./components/Form";
import { orderBy } from "lodash";
import CommentList from "./components/CommentList";
import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:8888'
})

export default class App extends Component {
    state = {
        tabs: [],
        active: 'time',
        list: []
    }
    getTabs = async () => {
        const res = await http.get('/tabs')
        this.setState({
            tabs: res.data
        })
    }

    getList = async () => {
        const list = await http.get('/list')
        this.setState({
            list: list.data
        })
    }
    async componentDidMount() {
        this.getTabs()
        this.getList()
    }
    changeTab = active => {
        this.setState({
            active
        })
    }
    delComment = id => {
        this.setState({
            list: this.state.list.filter(item => item.id !== id)
        })
    }
    // 添加评论的 回调函数
    addComment = comment => {
        const id = Math.max(...this.state.list.map(item => item.id)) + 1

        this.setState({
            list: [
                {
                    id,
                    author: '89 18k',
                    comment,
                    time: new Date(),
                    // 1: 点赞 0：无态度 -1:踩
                    attitude: 0
                },
                ...this.state.list
            ]
        })
    }
    // 提供点赞或踩的 回调函数
    changeAttitude = (id, attitude) => {
        console.log(id, attitude)
        this.setState({
            list: this.state.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        attitude
                    }
                }

                return item
            })
        })
    }
    render() {
        const { tabs, active, list } = this.state
        let newList
        if (active === 'hot') {
            // 约定按照 id 排
            newList = orderBy(list, ['id'], ['asc'])
        } else {
            // 按照时间排序
            newList = orderBy(list, ['time'], ['desc'])
        }
        return (
            <div className="App">
                <div className="comment-container">
                    {/* 评论数 */}
                    <div className="comment-head">
                        <span>{list.length} 评论</span>
                    </div>
                    {/* 排序 */}
                    <Tabs tabs={tabs} active={active} changeTab={this.changeTab} />

                    {/* 添加评论 */}
                    <Form addComment={this.addComment} />

                    {/* 评论列表 */}
                    <CommentList list={newList} delComment={this.delComment}
                        changeAttitude={this.changeAttitude}
                    />
                </div>
            </div>
        )
    }
}