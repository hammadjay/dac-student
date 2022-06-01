import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notificationData',
    initialState: {
        data: []
    },
    reducers: {
        updateNotif: (state, action) => {
            state.data = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {updateNotif} = notificationSlice.actions

export default notificationSlice.reducer