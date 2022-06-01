import { createSlice } from '@reduxjs/toolkit'

export const chatsSlice = createSlice({
    name: 'chatsData',
    initialState: {
        data: []
    },
    reducers: {
        updateChats: (state, action) => {
            state.data = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {updateChats} = chatsSlice.actions

export default chatsSlice.reducer