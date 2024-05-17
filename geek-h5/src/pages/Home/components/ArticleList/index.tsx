import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { useState } from 'react'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { useHistory } from 'react-router-dom'
type Props = {
  channelId: number
}
const ArticleList = ({ channelId }: Props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { channelArticles } = useSelector((state: RootState) => state.home)
  const currentChannelArticle = channelArticles[channelId] ?? {
    pre_timestamp: Date.now() + '',
    results: []
  }
  const { pre_timestamp, results } = currentChannelArticle
  async function loadMore() {
    // console.log('loadMore')
    await dispatch(getArticleList(channelId, pre_timestamp))
  }
  const hasMore = pre_timestamp !== null
  const onRefresh = async () => {
    console.log(Date.now())
    dispatch(getArticleList(channelId, Date.now() + ''))
  }
  const renderArticleList = () => {
    return results.map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        cover: { type, images },
        art_id
      } = item

      const articleData = {
        title,
        pubdate,
        comm_count,
        aut_name,
        type,
        images
      }
      return (
        <div className="article-item" key={index} onClick={() => history.push(`/article/${art_id}`)}>
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      {/* {results.map((item, index) => (
        <div className="article-item" key={index}>
          <ArticleItem type={1} />
        </div>
      ))} */}
      <PullToRefresh onRefresh={onRefresh}>
        {renderArticleList()}
      </PullToRefresh>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
