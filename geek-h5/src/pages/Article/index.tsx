import { NavBar, InfiniteScroll, Toast, Popup } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'
import ContentLoader from 'react-content-loader'
import { Icon } from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useInitialState } from '@/utils/use-initial-state'
import { addArticleComment, articleCommentThumbUp, collectArticle, followAuthor, getArticleById, getArticleComments, getArticleCommentsFirst, likeArticle, updateCommentCount } from '@/store/actions/article'
import { useEffect, useRef, useState } from 'react'
import highlight from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { throttle } from 'lodash'
import { useDispatch } from 'react-redux'
import NoneComment from '@/components/NoneComment'
import CommentInput from './components/CommentInput'
import Reply from './components/Reply'
import { ArtComment } from '@/types/data'
enum CommentType {
  Article = 'a',
  Comment = 'c'
}
const NAV_BAR_HEIGHT = 45
const Article = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { detail, comments } = useInitialState(
    () => getArticleById(params.id),
    'article',
    () => setLoading(false)
  )
  const {
    art_id,
    aut_id,
    // // 是否点赞
    attitude,
    // // 是否收藏
    is_collected,
    content,
    is_followed,
    aut_name,
    aut_photo,
    comm_count,
    like_count,
    pubdate,
    read_count,
    title
  } = detail
  const loadMoreComments = async () => {
    console.log('加载更多评论')
    await dispatch(getArticleComments(CommentType.Article, params.id, last_id))
  }
  useEffect(() => {
    // console.log('detail')
    const dgHtmlDOM = document.querySelector('.dg-html')
    const codes = dgHtmlDOM?.querySelectorAll<HTMLElement>('pre code')
    // console.log(codes)
    if (codes && codes.length > 0) {
      codes.forEach(el => {
        highlight.highlightElement(el)
      })
      return
    }

    const pres = dgHtmlDOM?.querySelectorAll('pre')
    // console.log(pres)
    if (pres && pres.length > 0) {
      pres.forEach(el => {
        highlight.highlightElement(el)
      })
    }
    highlight.configure({
      ignoreUnescapedHTML: true
    })
  }, [detail])
  const commentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const [showNavAuthor, setShowNavAuthor] = useState(false)
  const author = authorRef.current
  const wrapper = wrapperRef.current
  useEffect(() => {
    console.log('params.id')
    dispatch(getArticleCommentsFirst(CommentType.Article, params.id, null))
  }, [dispatch, params.id])
  useEffect(() => {
    const onScroll = throttle(() => {
      // console.log(author?.getBoundingClientRect())
      const { bottom } = authorRef.current!.getBoundingClientRect()
      if (bottom - 44 <= 0) {
        setShowNavAuthor(true)
      } else {
        setShowNavAuthor(false)
      }
    }, 100)
    wrapper?.addEventListener('scroll', onScroll)
    return () => {
      wrapper?.removeEventListener('scroll', onScroll)
    }
  }, [loading])
  const isShowComment = useRef(false)
  const onShowComment = () => {
    const comment = commentRef.current
    if (!isShowComment.current) {
      wrapper?.scrollTo({
        top: comment!.offsetTop - NAV_BAR_HEIGHT,
        behavior: 'auto'
      })
      isShowComment.current = true
    } else {
      wrapper?.scrollTo(0, 0)
      isShowComment.current = false
    }
  }
  const onFollow = () => {
    dispatch(followAuthor(aut_id, is_followed))
  }
  const onCollected = async () => {
    await dispatch(collectArticle(art_id, is_collected))
    Toast.show(is_collected ? '取消收藏' : '已收藏')
  }
  const onLike = async () => {
    await dispatch(likeArticle(art_id, attitude))
    Toast.show(attitude === 1 ? '取消点赞' : '已点赞')
  }
  const { end_id, last_id } = comments
  const hasMore = end_id !== last_id
  const [showReply, setShowReply] = useState({
    visible: false,
    commentItem: {} as ArtComment
  })
  const renderArticle = () => {
    // 文章详情
    return (
      // <ContentLoader
      //   speed={2}
      //   width={375}
      //   height={230}
      //   viewBox="0 0 375 230"
      //   backgroundColor="#70d4ff"
      //   foregroundColor="#a8fff1"
      // >
      //   <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      //   <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      //   <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      //   <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      //   <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      //   <circle cx="20" cy="20" r="20" />
      // </ContentLoader>
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{title}</h1>
            <div className="info">
              <span>{pubdate}</span>
              <span>{read_count}</span>
              <span>{comm_count}</span>
            </div>
            <div className="author" ref={authorRef}>
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">人才</span>
              <span className={classNames('follow', is_followed ? 'followed' : '')}
                onClick={onFollow}>
                {is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>
          <div className="content">
            <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: content }} />
            <div className="date">发布文章时间：2021-2-1</div>
          </div>
        </div>
        <div className="comment" ref={commentRef}>
          <div className="comment-header">
            <span>全部评论（{comm_count}）</span>
            <span>{like_count} 点赞</span>
          </div>
          {
            comments.results.length === 0 ? (<NoneComment />) : (
              <div className="comment-list">
                {comments.results.map(item => (
                  <CommentItem key={item.com_id} {...item}
                    onThumbUp={() => onThumbUp(item.com_id, item.is_liking)}
                    onReplyShow={() =>
                      setShowReply({
                        visible: true,
                        commentItem: item
                      })} />
                ))}
                <InfiniteScroll hasMore={hasMore} loadMore={loadMoreComments} />
              </div>
            )
          }
        </div>
      </div>
    )
  }
  const [commentVisible, setCommentVisible] = useState(false)
  const onCommentShow = () => setCommentVisible(true)
  const onCommentHide = () => setCommentVisible(false)
  const onAddComment = async (content: string) => {
    console.log(content)
    await dispatch(addArticleComment(art_id, content))
    onCommentHide()
  }
  const onThumbUp = (com_id: string, is_liking: boolean) => {
    dispatch(articleCommentThumbUp(com_id, is_liking))
  }
  const onReplyHide = (commentId: string, total: number) => {
    dispatch(updateCommentCount(commentId, total))
    setShowReply({
      ...showReply,
      visible: false
    })
  }
  const renderCommentReply = () => {
    return (
      <Popup
        bodyStyle={{
          width: '100%'
        }}
        position="right"
        visible={showReply.visible}
        destroyOnClose
      >
        {/* <Reply onClose={onReplyHide} commentItem={showReply.commentItem} onReplyThumbUp={onThumbUp} articleId={params.id}></Reply> */}
        <Reply onClose={onReplyHide} commentItem={showReply.commentItem} onReplyThumbUp={onThumbUp} articleId={params.id}></Reply>
      </Popup>
    )
  }
  const renderCommentPopup = () => {
    return (
      <Popup
        className="comment-popup"
        position="bottom"
        visible={commentVisible}
        onMaskClick={onCommentHide}
      >
        <div className="comment-popup-wrapper">
          <CommentInput onClose={onCommentHide} onAddComment={onAddComment} />
        </div>
      </Popup>
    )
  }
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {showNavAuthor && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">人才</span>
              <span className={classNames('follow', is_followed ? 'followed' : '')}>
                {is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter onShowComment={onShowComment} onCollected={onCollected}
          is_collected={is_collected} onLike={onLike} attitude={attitude}
          onCommentPopup={onCommentShow} />
        {renderCommentPopup()}
        {renderCommentReply()}
      </div>
    </div>
  )
}

export default Article
