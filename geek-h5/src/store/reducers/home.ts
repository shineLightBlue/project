import { Channel } from "@/types/data"
import { HomeAction } from "@/types/store"
import { sortBy } from "lodash"
import { Articles } from "@/types/data"
type HomeState = {
    userChannel: Channel[],
    restChannel: Channel[],
    channelActiveKey: string,
    channelArticles: {
        [key: number]: Articles
    }
}
const initialState: HomeState = {
    userChannel: [],
    restChannel: [],
    channelActiveKey: '',
    channelArticles: {}
}
const home = (state = initialState, action: HomeAction): HomeState => {
    switch (action.type) {
        case 'home/getUserChannel':
            return {
                ...state,
                userChannel: action.payload,
                channelActiveKey: action.payload[0].id + ''
            }
        case 'home/getAllChannel':
            return {
                ...state,
                restChannel: action.payload
            }
        case 'home/changeTab':
            return {
                ...state,
                channelActiveKey: action.payload
            }
        case 'home/delChannel':
            return {
                ...state,
                userChannel: state.userChannel.filter(item => item.id !== action.payload.id),
                restChannel: sortBy([...state.restChannel, action.payload], 'id')
            }
        case 'home/addChannel':
            return {
                ...state,
                userChannel: [...state.userChannel, action.payload],
                restChannel: state.restChannel.filter(item => item.id !== action.payload.id)
            }
        case 'home/getChannelArticles':
            const curChannelArticles = state.channelArticles[action.payload.channelId] ?? {
                // pre_timestamp: null,
                results: []
            }
            const { channelId, data: { pre_timestamp, results } } = action.payload
            return {
                ...state,
                channelArticles: {
                    ...state.channelArticles,
                    [channelId]: {
                        pre_timestamp,
                        results: [...results, ...curChannelArticles.results]
                    }
                }
            }
        default:
            return state
    }
}
export default home