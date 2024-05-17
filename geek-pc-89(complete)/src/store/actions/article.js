import { http } from '@/utils'

// 创建获取频道列表数据的 action
export const getChannels = () => {
  return async dispatch => {
    const res = await http.get('/channels')

    const { channels } = res.data.data

    dispatch({ type: 'article/getChannels', payload: channels })
  }
}

// 获取文章列表数据
export const getArticles = params => {
  return async dispatch => {
    const res = await http.get('/mp/articles', {
      params
    })

    const {
      page,
      per_page: pageSize,
      results: list,
      total_count: count
    } = res.data.data

    dispatch({
      type: 'article/getArticles',
      payload: {
        page,
        pageSize,
        list: list.map(item => {
          return {
            ...item,
            cover: item.cover.images[0]
          }
        }),
        count
      }
    })
  }
}

/**
 * 根据 id 删除文章
 * @param {string} id 文章id
 * @returns thunk action
 */
export const delArticle = id => {
  return async () => {
    // 删除文章，接口没有返回数据，所以，此处就不再获取返回值了
    await http.delete(`/mp/articles/${id}`)
  }
}

// export const delArticle = (id, params) => {
//   return async dispatch => {
//     // 删除文章，接口没有返回数据，所以，此处就不再获取返回值了
//     await http.delete(`/mp/articles/${id}`)

//     // 可以继续分发 action 来根据筛选条件来获取文章列表数据
//     dispatch(getArticles(params))
//   }
// }
