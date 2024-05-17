import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    console.log(latestTimestamp)
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    console.log(response)
    return response.data
  }
)
const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        console.log(notification)
        notification.read = true
      })
      // state.forEach((notification) => {
      //   notification.read = true
      // })
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchNotifications.fulfilled, (state, action) => {
  //     console.log(action)
  //     return action.payload
  //   })
  // },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      // state.forEach((notification) => {
      //   console.log(notification)
      //   notification.isNew = !notification.read
      // })
      // state.push(...action.payload)
      Object.values(state.entities).forEach((notification) => {
        console.log(notification)
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload)
    },
  },
})
export default notificationsSlice.reducer
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications)
export const { allNotificationsRead } = notificationsSlice.actions
