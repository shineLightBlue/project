import * as types from '../actionTypes/channels'
import axios from 'axios'
export const getChannels = () => {
    return async dispatch => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        console.log(res)
        dispatch({ type: types.GET_CHANNELS, payload: res.data.data.channels })
    }
}
export const changeActive = id => ({
    type: types.CHANGE_ACTIVE,
    payload: id
})