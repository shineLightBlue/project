import axios from 'axios'
import * as types from '../actionTypes/articles'
export const getArticles = channelId => {
    return async dispatch => {
        const res = await axios.get(
            `http://geek.itheima.net/v1_0/articles?channel_id=${channelId}&timestamp=${Date.now()}`
        )
        console.log(res)
        dispatch({ type: types.GET_ARTICLES, payload: res.data.data.results })
    }
}