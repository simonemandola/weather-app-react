/**
 * Current weather
 */
export async function getCurrentWeatherData(): Promise<object> {
    return await fetch("https://api.openweathermap.org/data/2.5/weather?lat=39.4686171&lon=-0.3529373&lang=es&units=metric&appid=9014bc217533668d1681d0858a1ca241")
        .then(r => r.json())
        .then(data => {
            return data
        })
}

/**
 * Hourly weather
 */
export async function getOneCallWeatherData(): Promise<object> {
    return await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=39.4686171&lon=-0.3529373&lang=es&units=metric&appid=9014bc217533668d1681d0858a1ca241")
        .then(r => r.json())
        .then(data => {
            return data
        })
}
