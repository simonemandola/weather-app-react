import {createSlice} from '@reduxjs/toolkit'

export const systemSlice = createSlice({
    name: 'system',
    initialState: {
        value: {
            isMobile: false,
        },
    },
    reducers: {
        updateSystemIsMobileState: (state, action)=> {
            state.value.isMobile = action.payload
        }
    }
})

export const { updateSystemIsMobileState } = systemSlice.actions

export default systemSlice.reducer
