import { Component, createRef } from 'react'
import avatar from '../images/avatar.png'

class Form extends Component {
    state = {
        txt: ""
    }
    txtRef = createRef()
    changeTxt = e => {
        this.setState({
            txt: e.target.value
        })
    }
    // 添加评论
    onAddComment = () => {
        const { txt } = this.state

        // 1 非空校验
        // 2 让文本框获得焦点
        if (txt.trim() === '') return this.txtRef.current.focus()

        // 将文本框的值传递给父组件
        this.props.addComment(txt)

        // 3 清空文本看的值
        this.setState({
            txt: ''
        })
    }
    render() {
        return (
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
                        value={this.state.txt}
                        onChange={this.changeTxt}
                        ref={this.txtRef}
                    />
                    <button className="comment-submit" onClick={this.onAddComment}>发表评论</button>
                </div>
                <div className="comment-emoji">
                    <i className="face"></i>
                    <span className="text">表情</span>
                </div>
            </div>
        )
    }
}

export default Form