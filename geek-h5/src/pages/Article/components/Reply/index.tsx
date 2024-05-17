import { Popup, NavBar } from 'antd-mobile'

import CommentItem from '../CommentItem'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import NoneComment from '@/components/NoneComment'

import styles from './index.module.scss'
import { AddCommentReplyResponse, ArtComment, ArticleComment, ArticleCommentResponse } from '@/types/data'
import { useEffect, useState } from 'react'
import { http } from '@/utils/http'

type Props = {
  onClose: (commentId: string, total: number) => void
  commentItem: ArtComment
  onReplyThumbUp: (com_id: string, is_liking: boolean) => void,
  articleId: string
}

const Reply = ({ onClose, commentItem, onReplyThumbUp, articleId }: Props) => {
  const [showPopup, setShowPopup] = useState(false)
  const onReplyPopupHide = () => setShowPopup(false)
  console.log(commentItem)
  const [comment, setComment] = useState(commentItem)
  const [reply, setReply] = useState({
    results: [] as ArtComment[],
    total_count: 0
  })
  useEffect(() => {
    const loadData = async () => {
      const res = await http.get<ArticleCommentResponse>('/comments', {
        params: {
          type: 'c',
          source: comment.com_id
        }
      })
      console.log(res)
      setReply(res.data.data)
    }
    loadData()
  }, [comment.com_id])
  const onThumbUp = async () => {
    // if (comment.is_liking) {
    //   await http.delete(`/comment/likings/${comment.com_id}`)
    // } else {
    //   await http.post('/comment/likings', {
    //     target: comment.com_id
    //   })
    // }
    setComment({
      ...comment,
      is_liking: !comment.is_liking,
      like_count: comment.is_liking ? comment.like_count - 1 : comment.like_count + 1
    })
    onReplyThumbUp(comment.com_id, comment.is_liking)
  }
  const onAddComment = async (value: string) => {
    const res = await http.post<AddCommentReplyResponse>('/comments', {
      target: comment.com_id,
      content: value,
      art_id: articleId
    })
    console.log(res)
    setReply({
      ...reply,
      total_count: reply.total_count + 1,
      results: [res.data.data.new_obj, ...reply.results]
    })
    onReplyPopupHide()
  }
  const onBackToArticle = () => {
    onClose(comment.com_id, reply.total_count)
  }
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onBack={onBackToArticle}>
          {reply.results.length}条回复
        </NavBar>

        {/* 要回复的评论 */}
        <div className="origin-comment">
          <CommentItem type="origin" {...comment} onThumbUp={onThumbUp} />
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {reply.results.length > 0 ? (
            reply.results.map(item => (
              <CommentItem type="reply" {...item} key={item.com_id} />
            ))
          ) : <NoneComment />}
        </div>

        <CommentFooter placeholder="去评论" type="reply"
          onCommentPopup={() => setShowPopup(true)} />
      </div>

      {/* 回复文本框对应的抽屉 */}

      <Popup className="reply-popup" position="bottom" visible={showPopup}>
        <CommentInput onClose={onReplyPopupHide} onAddComment={onAddComment} />
      </Popup>
    </div>
  )
}

export default Reply
