import { ArticleComment, ArticleDetail } from "@/types/data";
import { ArticleAction } from "@/types/store";
type ArticleState = {
    detail: ArticleDetail
    comments: ArticleComment
}
const initialState = {
    detail: {},
    comments: {
        results: [] as ArticleComment['results']
    }
} as ArticleState
const article = (state = initialState, action: ArticleAction): ArticleState => {
    if (action.type === 'article/get') {
        return {
            ...state,
            detail: action.payload
        }
    }
    if (action.type === 'article/updateInfo') {
        return {
            ...state,
            detail: {
                ...state.detail,
                [action.payload.name]: action.payload.value
            }
        }
    }
    if (action.type === 'article/getArticleCommentsFirst') {
        return {
            ...state,
            comments: action.payload
        }
    }
    if (action.type === 'article/getArticleComments') {
        const { end_id, last_id, results, total_count } = action.payload
        return {
            ...state,
            comments: {
                end_id,
                last_id,
                total_count,
                results: [...state.comments.results, ...results]
            }
        }
    }
    if (action.type === 'article/addArticleComment') {
        return {
            ...state,
            comments: {
                ...state.comments,
                results: [action.payload, ...state.comments.results]
            }
        }
    }
    if (action.type === 'article/articleCommentThumbUp') {
        const { id, is_liking } = action.payload
        return {
            ...state,
            comments: {
                ...state.comments,
                results: state.comments.results.map(item => {
                    if (item.com_id === id) {
                        return {
                            ...item,
                            is_liking: is_liking,
                            like_count: is_liking ? item.like_count + 1 : item.like_count - 1
                        }

                    }
                    return item
                })
            }
        }
    }
    if (action.type === 'article/updateCommentCount') {
        return {
            ...state,
            comments: {
                ...state.comments,
                results: state.comments.results.map(item => {
                    if (item.com_id === action.payload.commentId) {
                        return {
                            ...item,
                            reply_count: action.payload.total
                        }
                    }
                    return item
                })
            }
        }
    }
    return state
}
export default article