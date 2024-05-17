import moment from 'moment'
import classNames from 'classnames'
import avatar from '../images/avatar.png'

const formatTime = time => {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

const CommentList = ({ list, delComment, changeAttitude }) => {
    return (
        <div className="comment-list">
            {list.map(item => (
                <div className="list-item" key={item.id}>
                    <div className="user-face">
                        <img className="user-head" src={avatar} alt="" />
                    </div>
                    <div className="comment">
                        <div className="user">{item.author}</div>
                        <p className="text">{item.comment}</p>
                        <div className="info">
                            <span className="time">{formatTime(item.time)}</span>
                            <span
                                className={classNames('like', {
                                    liked: item.attitude === 1
                                })}
                                onClick={() =>
                                    changeAttitude(item.id, item.attitude === 1 ? 0 : 1)
                                }
                            >
                                <i className="icon" />
                            </span>
                            <span
                                className={classNames('hate', {
                                    hated: item.attitude === -1
                                })}
                                onClick={() =>
                                    changeAttitude(item.id, item.attitude === -1 ? 0 : -1)
                                }
                            >
                                <i className="icon" />
                            </span>
                            <span className="reply btn-hover"
                                onClick={() => delComment(item.id)}
                            >删除</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentList