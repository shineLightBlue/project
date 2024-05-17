import { AddArticleCommentResponse, ArticleCommentResponse, ArticleDetailResponse } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import { http } from "@/utils/http";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
export const getArticleById = (id: string): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<ArticleDetailResponse>(`/articles/${id}`)
        console.log(res)
        const detail = res.data.data
        dispatch({
            type: 'article/get',
            payload: {
                ...detail,
                pubdate: dayjs(detail.pubdate).locale('zh-cn').format('LL')RootThunkAction
            }
        })
    }
}
export const followAuthor = (id: string, isFollowed: boolean): RootThunkAction => {
    return async dispatch => {
        if (isFollowed) {
            await http.delete(`/user/followings/${id}`)
        } else {
            await http.post('/user/followings', {
                target: id
            })
        }
        dispatch({
            type: 'article/updateInfo',
            payload: {
                name: 'is_followed',
                value: !isFollowed
            }
        })
    }
}
export const collectArticle = (art_id: string, isCollected: boolean): RootThunkAction => {
    return async dispatch => {
        if (isCollected) {
            await http.delete(`/article/collections/${art_id}`)
        } else {
            await http.post(`/article/collections`, {
                target: art_id
            })
        }
        dispatch({
            type: 'article/updateInfo',
            payload: {
                name: 'is_collected',
                value: !isCollected
            }
        })
    }
}
export const likeArticle = (art_id: string, attitude: number): RootThunkAction => {
    return async dispatch => {
        if (attitude === 1) {
            await http.delete(`/article/likings/${art_id}`)
        } else {
            await http.post('/article/likings', {
                target: art_id
            })
        }
        dispatch({
            type: 'article/updateInfo',
            payload: {
                name: 'attitude',
                value: attitude === 1 ? 0 : 1
            }
        })
    }
}
export const getArticleCommentsFirst = (type: string, id: string, offset: string | null): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<ArticleCommentResponse>('/comments', {
            params: {
                type,
                source: id,
                offset
            }
        })
        console.log(res)
        dispatch({
            type: 'article/getArticleCommentsFirst',
            payload: res.data.data
        })
    }
}
export const getArticleComments = (
    type: string,
    targetId: string,
    offset: string | null
): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<ArticleCommentResponse>('/comments', {
            params: {
                type,
                source: targetId,
                offset
            }
        })

        dispatch({
            type: 'article/getArticleComments',
            payload: res.data.data
        })
    }
}
export const addArticleComment = (
    art_id: string,
    value: string
): RootThunkAction => {
    return async dispatch => {
        const res = await http.post<AddArticleCommentResponse>('/comments', {
            target: art_id,
            content: value
        })
        console.log(res)
        dispatch({
            type: 'article/addArticleComment',
            payload: res.data.data.new_obj
        })
    }
}
export const articleCommentThumbUp = (com_id: string, is_liking: boolean): RootThunkAction => {
    return async dispatch => {
        if (!is_liking) {
            await http.post('/comment/likings', {
                target: com_id
            })
        } else {
            await http.delete(`/comment/likings/${com_id}`)
        }
        dispatch({
            type: 'article/articleCommentThumbUp',
            payload: {
                id: com_id,
                is_liking: !is_liking
            }
        })
    }
}
export const updateCommentCount = (
    commentId: string,
    total: number
): RootThunkAction => {
    return async dispatch => {
        dispatch({
            type: 'article/updateCommentCount',
            payload: {
                commentId,
                total
            }
        })
    }
}