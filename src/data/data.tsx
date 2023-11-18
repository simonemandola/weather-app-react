export interface WeatherStateDataObject {
    lat: number,
    lon: number,
    // Air pollution
    airPollution: {
        list: {
            main: {
                aqi: number,
            }
        }[],
    },
    // Alerts
    alerts: {
        description: string,
        sender_name: string,
    }[],
    // Current
    current: {
        dt: number,
        name: string,
        visibility: number,
        main: {
            temp: number,
            feels_like: number,
            humidity: number,
            pressure: number,
        },
        weather: {
            description: string,
            icon: string,
        }[],
        sys: {
            country: string,
        }
        wind: {
            speed: number,
            deg: number,
        },
    },
    // Daily
    daily: {
        clouds: number,
        dt: string,
        sunrise: number,
        sunset: number,
        dew_point: number,
        wind_gust: number,
        moonrise: number,
        moonset: number,
        moon_phase: number,
        uvi: number,
        feels_like: {
            morn: number,
            eve: number,
            night: number,
        },
        temp: {
            min: number,
            max: number,
        },
        weather: {
            description: string,
            icon: string,
        }[],
    }[],
    // Hourly
    hourly: {
        dt: number,
        temp: number,
        pop: number,
        humidity: number,
        uvi: number,
        wind_speed: number,
        wind_deg: number,
        weather: {
            dt: number,
            description: string,
            icon: string,
        }[],
    }[],
    timezone_offset: number,
}

export interface StateWeather {
    weatherData: {
        value: WeatherStateDataObject
    }
}

export interface StateSystem {
    system: {
        value: {
            isMobile: boolean,
        }
    }
}

export interface SearchCityFormProps {
    getBulkWeatherData: (lat: number, lon: number, isNewSearch: boolean) => void
}

export interface GeolocationObject {
    coords: {
        latitude: number,
        longitude: number,
    }
}
export enum DefaultGeolocation {
    lat = 40.4165,
    lon = -3.70256,
}

export enum AirPollutionName {
    AP1 = "Buena",
    AP2 = "Razonablemente buena",
    AP3 = "Moderada",
    AP4 = "Poco saludable",
    AP5 = "Muy poco saludable",
}

export enum UvIndexName {
    UVIndex1 = "Baja - No necesita protección",
    UVIndex2 = "Moderada - Necesita protección",
    UVIndex3 = "Alta - Necesita protección",
    UVIndex4 = "Muy alta - Necesita protección extra",
    UVIndex5 = "Extremadamente alta - Necesita protección extra",
}
