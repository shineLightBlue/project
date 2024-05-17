import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'
import { selectAllUsers } from '../users/usersSlice'
import {
  selectAllNotifications,
  allNotificationsRead,
} from './notificationsSlice'
export const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  console.log(notifications)
  const users = useSelector(selectAllUsers)
  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })
  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }
    const notificationClassname = classnames('notification', {
      new: notification.isNew === false ? notification.isNew : true,
    })
    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b>
          {notification.message}
          {notification.id}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
