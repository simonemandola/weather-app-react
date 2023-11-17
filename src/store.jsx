import { configureStore } from "@reduxjs/toolkit"
import systemReducer from "/src/features/systemSlice.jsx"
import weatherDataReducer from "/src/features/weatherDataSlice.jsx"

export const store = configureStore({
    reducer: {
        weatherData: weatherDataReducer,
        system: systemReducer,
    },
})