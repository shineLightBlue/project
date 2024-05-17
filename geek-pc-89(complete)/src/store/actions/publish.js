import { http } from '@/utils'

// 发布 或 编辑 文章
export const updateArticle = (data, isDraft, isEdit) => {
  return async () => {
    if (isEdit) {
      // 编辑
      await http.put(`/mp/articles/${data.id}?draft=${isDraft}`, data)
    } else {
      // 发布
      await http.post(`/mp/articles?draft=${isDraft}`, data)
    }
  }
}

// 获取文章详情
export const getArticleById = id => {
  return async () => {
    const res = await http.get(`/mp/articles/${id}`)

    // 使用接口返回的数据，作为 action 的返回值
    return res.data.data
    // dispatch({ type: 'publish/getArticleById', payload: res.data.data })
  }
}
