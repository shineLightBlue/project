import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import { Icon } from '@/components/Icon'
import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSuggestion, getSuggestion } from '@/store/actions/search'
import { useDebounceFn } from 'ahooks'
import { RootState } from '@/types/store'
const GEEK_SEARCH_KEY = 'search-history'
const SearchPage = () => {
  const { run: debounceGetSuggest } = useDebounceFn((value: string) => {
    dispatch(getSuggestion(value))
  }, {
    wait: 500
  })
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  useEffect(() => {
    const histories = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]') as string[]
    setSearchHistory(histories)
  }, [])
  const { suggestion } = useSelector((state: RootState) => state.search)
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchTxt, setSearchTxt] = useState('')
  const onSearchChange = (value: string) => {
    setSearchTxt(value)
    console.log(value)
    if (value.trim() === '') return dispatch(clearSuggestion())
    debounceGetSuggest(value)
    // dispatch(getSuggestion(value))
  }
  const onSearch = (value: string) => {
    history.push(`/search/result?q=${value}`)
    dispatch(clearSuggestion())
    saveHistories(value)
  }
  const onClearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(GEEK_SEARCH_KEY)
  }
  const onDeleteHistory = (value: string) => {
    const newSearchHistory = searchHistory.filter(item => item !== value)
    setSearchHistory(newSearchHistory)
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newSearchHistory))
  }
  const saveHistories = (value: string) => {
    const localHistories = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
    ) as string[]
    let histories = []
    if (localHistories.length === 0) {
      histories = [value]
    } else {
      if (localHistories.indexOf(value) > -1) {
        const leftHistories = localHistories.filter(item => item !== value)
        histories = [value, ...leftHistories]
      } else {
        histories = [value, ...localHistories]
      }
    }
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(histories))
  }
  const highlightSuggestion = suggestion.map(item => {
    const lowerCaseItem = item.toLocaleLowerCase()
    // console.log(lowerCaseItem)
    const lowerCaseSearchTxt = searchTxt.toLocaleLowerCase()
    // console.log(lowerCaseSearchTxt)
    const index = lowerCaseItem.indexOf(lowerCaseSearchTxt)
    // console.log(index)
    const searchTxtLength = searchTxt.length
    const left = item.slice(0, index)
    // console.log(left)
    const right = item.slice(index + searchTxtLength)
    // console.log(right)
    const search = item.slice(index, index + searchTxtLength)
    // console.log(search)
    return {
      left,
      right,
      search
    }
  })
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text" onClick={() => onSearch(searchTxt)}>搜索</span>}
      >
        <SearchBar placeholder="请输入关键字搜索" value={searchTxt} onChange={onSearchChange} />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: suggestion.length > 0 ? 'none' : 'block'
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={onClearHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {
              searchHistory.map((item, index) => (
                <span className="history-item" key={index}>
                  <span className="text-overflow">{item}</span>
                  <Icon type="iconbtn_essay_close" onClick={() => onDeleteHistory(item)} />
                </span>
              ))
            }

          </div>
        </div>
      )}

      <div className={classnames('search-result', suggestion.length > 0 ? 'show' : '')}>
        {highlightSuggestion.map((item, index) => (
          <div className="result-item" key={index}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value text-overflow">
              {item.left}
              <span>{item.search}</span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
