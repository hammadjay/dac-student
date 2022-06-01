import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../features/userData/userData'
import NotificationReducer from '../features/Notifications/notifications'
import chatsReducer from '../features/Chats/chats'

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    notifData: NotificationReducer,
    chatsData: chatsReducer
  },
});
