import { Icon } from '@/components/Icon'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  onShowComment?: () => void
  onCollected?: () => void
  is_collected?: boolean
  onLike?: () => void
  attitude?: number,
  onCommentPopup?: () => void
  placeholder?: string,
}

const CommentFooter = ({ placeholder = '抢沙发', type = 'normal', onShowComment, onCollected, is_collected, onLike, attitude, onCommentPopup }: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onCommentPopup}>
        <Icon type="iconbianji" />
        <span>{placeholder}</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onShowComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!1 && <span className="bage">{1}</span>}
          </div>
          <div className="action-item" onClick={onLike}>
            <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={onCollected}>
            <Icon type={is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item" onClick={onLike}>
          <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
