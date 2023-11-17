import {createSlice} from '@reduxjs/toolkit'
import {getWeekdayNameLong} from "../mixins/mixins.tsx";

export const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState: {
        value: {},
    },
    reducers: {
        updateWeatherData: (state, action) => {
            state.value = action.payload
            state.value.daily.map((day) => {
                day.dt = typeof day.dt == "number" ? getWeekdayNameLong(day.dt) : day.dt
                day.weatherIcon = day.weather[0].icon
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateWeatherData } = weatherDataSlice.actions

export default weatherDataSlice.reducer
