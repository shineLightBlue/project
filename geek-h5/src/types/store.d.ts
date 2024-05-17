import { ArtComment, ArticleComment, ArticleDetail, Channel, SearchResult, Suggestion, Token } from "./data";
import store from "@/store";
import { ThunkAction } from "redux-thunk";
import type { User } from '../data'
import type { UserProfile } from './data'
import type { Articles } from "./data";
type LoginAction =
    | {
        type: 'login/token'
        payload: Token
    }
    | {
        type: 'login/logout'
    }
type ProfileAction = {
    type: 'profile/getUser'
    payload: User
} | {
    type: 'profile/getUserProfile'
    payload: UserProfile
} | {
    type: 'profile/update'
    payload: Partial<UserProfile>
}
type HomeAction = {
    type: `home/getUserChannel`,
    payload: Channel[]
} | {
    type: 'home/getAllChannel',
    payload: Channel[]
} |
{
    type: 'home/changeTab',
    payload: string
} | {
    type: 'home/delChannel',
    payload: Channel
} | {
    type: 'home/addChannel',
    payload: Channel
} | {
    type: 'home/getChannelArticles',
    payload: {
        channelId: number
        data: Articles
    }
}
type SearchAction = {
    type: 'search/suggestion'
    payload: Suggestion['options']
} | {
    type: 'search/clearSuggestion'
}
    | {
        type: 'search/getSearchResult'
        payload: SearchResult
    }
type ArticleAction = {
    type: 'article/get'
    payload: ArticleDetail
} | {
    type: 'article/updateInfo'
    payload: {
        name: 'is_followed' | 'is_collected' | 'attitude'
        value: boolean | number
    }
} | {
    type: `article/${'getArticleComments' | 'getArticleCommentsFirst'}`
    payload: ArticleComment
} | {
    type: 'article/addArticleComment',
    payload: ArtComment
} | {
    type: 'article/articleCommentThumbUp',
    payload: {
        id: string
        is_liking: boolean
    }
} | {
    type: 'article/updateCommentCount',
    payload: {
        commentId: string
        total: number
    }
}
type RootState = ReturnType<typeof store.getState>
type RootAction = LoginAction | ProfileAction | HomeAction | SearchAction | ArticleAction
type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
