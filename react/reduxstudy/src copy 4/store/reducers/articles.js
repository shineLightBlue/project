import * as types from '../actionTypes/articles'
const initialState = []
export const articles = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ARTICLES:
            return action.payload
        default:
            return state
    }
}