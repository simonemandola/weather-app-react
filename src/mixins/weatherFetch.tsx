// Openweather
const API_BASE_URL_OPENWEATHER = import.meta.env.VITE_API_BASE_URL_OPENWEATHER
const APP_ID_OPENWEATHER = import.meta.env.VITE_APP_ID_OPENWEATHER

// Mapbox
const API_BASE_URL_MAPBOX = import.meta.env.VITE_API_BASE_URL_MAPBOX
const FORMAT = ".json?"
const TOKEN = "access_token="
const PK = import.meta.env.VITE_MAPBOX_PK
const AUTOCOMPLETE = "&autocomplete=true"
const TYPES = "&types=place"
const LANG = "&language=es"


/**
 * Current weather
 */
// lat=39.4686171, lon = -0.3529373
export async function getCurrentWeatherData(lat: number, lon: number): Promise<object> {
    return await fetch(`${API_BASE_URL_OPENWEATHER}weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${APP_ID_OPENWEATHER}`)
        .then(r => r.json())
        .then(data => data)
}

/**
 * One call weather
 */
export async function getOneCallWeatherData(lat: number, lon: number): Promise<object> {
    return await fetch(`${API_BASE_URL_OPENWEATHER}onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&exclude=current,minutely&appid=${APP_ID_OPENWEATHER}`)
        .then(r => r.json())
        .then(data => data)
}

export async function getAirPollution(lat: number, lon: number) {
    return await fetch(`${API_BASE_URL_OPENWEATHER}air_pollution?lat=${lat}&lon=${lon}&lang=es&appid=${APP_ID_OPENWEATHER}`)
        .then(r => r.json())
        .then(data => data)
}

/**
 * Geocoding city name
 */
export default async function geocodingCityName(city: string): Promise<string[] | undefined> {
    if (!city)
        return

    const result = await fetch(API_BASE_URL_MAPBOX +
        city +
        FORMAT +
        TOKEN +
        PK +
        AUTOCOMPLETE +
        TYPES +
        LANG)

    const data = await result.json()

    return data.features
}
