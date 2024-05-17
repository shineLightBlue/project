import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { increment } from "./counter/counterSlice";
import postReducer from "./post/postSlice";
import userSlice from "./user/userSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    user: userSlice,
  },
});
