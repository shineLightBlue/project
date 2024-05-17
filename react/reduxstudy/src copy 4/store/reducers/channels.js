import * as types from '../actionTypes/channels'
const initialState = {
    list: [],
    activeId: 0
}
export const channels = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CHANNELS:
            return {
                ...state,
                list: action.payload
            }
        case types.CHANGE_ACTIVE:
            return {
                ...state,
                activeId: action.payload
            }
        default:
            break;
    }
    return state
}