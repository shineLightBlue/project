const initialState = {
  // 频道数据
  channels: [],

  // 表格相关的数据
  page: 1,
  pageSize: 10,
  list: [],
  count: 0
}

export const article = (state = initialState, action) => {
  if (action.type === 'article/getChannels') {
    return {
      ...state,
      channels: action.payload
    }
  }

  if (action.type === 'article/getArticles') {
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}
