import { Channel, UserChannelResponse } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import { http } from "@/utils/http";
import { AllChannelsResponse } from "@/types/data";
import { differenceBy } from "lodash";
import { ArticlesResponse } from '@/types/data'
const CHANNEL_KEY = 'geek-channels'
export const getUserChannel = (): RootThunkAction => {
    return async (dispatch, getState) => {
        const {
            login: { token }
        } = getState()
        let userChannel: Channel[] = []
        if (token) {
            const res = await http.get<UserChannelResponse>('/user/channels')
            // console.log(res)
            const { channels } = res.data.data
            // console.log('登录', channels)
            userChannel = channels
        } else {
            const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]
            if (localChannels.length > 0) {
                console.log('未登录，本地有', localChannels)
                userChannel = localChannels
            } else {
                const res = await http.get<UserChannelResponse>('/user/channels')
                const { channels } = res.data.data
                localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
                console.log('未登录，本地没有', channels)
                userChannel = channels
            }
        }
        dispatch({ type: 'home/getUserChannel', payload: userChannel })
    }
}
export const getAllChannel = (): RootThunkAction => {
    return async (dispatch, getState) => {
        const res = await http.get<AllChannelsResponse>('/channels')
        console.log(res, 'getAllChannel')
        const { home: { userChannel } } = getState()
        const restChannels = differenceBy(res.data.data.channels, userChannel, 'id')
        dispatch({ type: 'home/getAllChannel', payload: restChannels })
    }
}
export const delChannel = (channel: Channel): RootThunkAction => {
    return async (dispatch, getState) => {
        const { login: { token } } = getState()
        if (token) {
            await http.delete(`/user/channels/${channel.id}`)
        } else {
            const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]
            const userChannel = localChannels.filter(item => item.id !== channel.id)
            localStorage.setItem(CHANNEL_KEY, JSON.stringify(userChannel))
        }
        dispatch({ type: 'home/delChannel', payload: channel })
    }
}
export const addChannel = (channel: Channel): RootThunkAction => {
    return async (dispatch, getState) => {
        const { login: { token } } = getState()
        if (token) {
            await http.patch('/user/channels', { channels: [channel] })
        } else {
            const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]
            const userChannel = [...localChannels, channel]
            localStorage.setItem(CHANNEL_KEY, JSON.stringify(userChannel))
        }
        dispatch({ type: 'home/addChannel', payload: channel })
    }
}
export const getArticleList = (
    channel_id: number,
    timestamp: string
): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<ArticlesResponse>('/articles', {
            params: {
                channel_id,
                timestamp
            }
        })
        // console.log(res)
        dispatch({
            type: 'home/getChannelArticles',
            payload: {
                channelId: channel_id,
                data: res.data.data
            }
        })
    }
}