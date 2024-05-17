import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  console.log(response, 'users')
  return response.data
})
const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  // extraReducers(builder) {
  //   builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //     console.log(action)
  //     return action.payload
  //   })
  // },
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll,
  },
})

export default usersSlice.reducer
// export const selectAllUsers = (state) => state.users
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId)
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users)
