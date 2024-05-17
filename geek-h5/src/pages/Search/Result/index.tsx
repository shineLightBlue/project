import { useHistory, useLocation } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useInitialState } from '@/utils/use-initial-state'
import { getSearchResult } from '@/store/actions/search'

const Result = () => {
  const history = useHistory()
  const location = useLocation()
  console.log(location.search)
  const params = new URLSearchParams(location.search)
  const q = params.get('q') ?? ''
  const { searchResults } = useInitialState(() => getSearchResult(q), 'search')
  const { results } = searchResults
  const renderArticleList = () => {
    return results.map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        art_id,
        cover: { type, images }
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
        <div
          key={index}
          className="article-item"
          onClick={() => history.push(`/article/${art_id}`)}
        >
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result
