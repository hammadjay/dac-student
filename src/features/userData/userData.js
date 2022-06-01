import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        data: {}
    },
    reducers: {
        updateData: (state, action) => {
            state.data = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {updateData} = userDataSlice.actions

export default userDataSlice.reducer