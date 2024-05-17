import { combineReducers } from "redux";
import { articles } from './articles'
import { channels } from './channels'
export const rootReducer = combineReducers({
    articles,
    channels
})