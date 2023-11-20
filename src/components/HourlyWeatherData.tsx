import {useSelector} from "react-redux";
import {formatTimeHour} from "../mixins/mixins.tsx";
import {StateWeather, WeatherStateDataObject} from "../data/data.tsx";

export default function HourlyWeatherData() {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)
    const minPopValue = 0.295

    return (
        <>
            { data.hourly
                && <section className="mt-20 sm:col-span-2">
                    <h2 className="mb-4">Mañana se prevé { data.daily[1].weather[0].description }</h2>
                    <ul className="flex gap-x-2 overflow-x-scroll bg-blue-100 p-4 rounded-xl">
                        {data.hourly.slice(0, 25).map(
                            (weather, index: number) => {
                                return (
                                    <li key={index} className="flex flex-col items-center justify-between gap-y-2 p-2 box-border bg-gray-100 min-w-[4rem] min-h-[7rem] rounded-xl">
                                        <p>{ index === 0 ? 'Ahora' : formatTimeHour(weather.dt, data.timezone_offset) }</p>
                                        <img
                                            className="w-8"
                                            src={`/assets/img/icons/${
                                                index == 0
                                                ? data.current.weather[0].icon
                                                : weather.weather[0].icon}.png`
                                        }
                                            alt={ weather.weather[0].description }
                                        />
                                        <p className="text-blue-700 text-xs">
                                            { weather.pop < minPopValue ? '' : `${Math.round(weather.pop * 100)}%` }
                                        </p>
                                        <p>{ index === 0 ? Math.round(data.current.main.temp) : Math.round(weather.temp) }º</p>
                                    </li>
                                )
                            }
                        )}
                    </ul>
            </section>
            }
            </>
    )
}