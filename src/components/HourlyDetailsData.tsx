import {useSelector} from "react-redux";
import {formatTimeHour} from "../mixins/mixins.tsx";
import {StateWeather, WeatherStateDataObject} from "../data/data.tsx";

export default function HourlyDetailsData() {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)

    const columns = [
        "Hora",
        "Temp.",
        "Lluvia",
        "Hume.",
        "UVI",
        "Vel. viento",
        "Dir. viento",
    ]

    return (
        <>
            { data.hourly && <section className="rounded-xl bg-blue-100 p-4 h-fit">
                <h2 className="mb-4">Previsión detallada por horas</h2>
                <p className="my-4 pl-4 text-xs font-bold w-full grid grid-cols-7 gap-x-2 items-center justify-between">
                    { columns.map( (columnName: string, index: number) =>  {
                        return <span key={index}>{ columnName }</span>
                    }) }
                </p>
                <ul className="[&>li:nth-child(odd)]:bg-gray-100 overflow-scroll h-[18rem]">
                    {data.hourly.slice(0, 25).map(
                        (weather, index: number) =>
                            <li key={index} className="text-sm sm:text-base w-full grid grid-cols-7 gap-x-2 items-center justify-between p-3 sm:p-4 box-border rounded-xl">
                                <p>{ index == 0 ? 'Ahora' : formatTimeHour(weather.dt, data.timezone_offset) }</p>
                                <p className="text-center">{ Math.round(weather.temp) }º</p>
                                <p className="text-center">{ Math.round(weather.pop * 100) }%</p>
                                <p className="text-center">{ weather.humidity }%</p>
                                <p className="text-center">{ weather.uvi }</p>
                                <p className="text-center">{ weather.wind_speed.toFixed(1) }<sub className="text-[.65rem] ml-1">m/s</sub></p>
                                <p className="text-center">
                                    <i className="pi pi-arrow-up text-xs scale-x-75" style={{ transform: `rotateZ(${weather.wind_deg}deg)` }}></i>
                                </p>
                            </li>
                    )}
                </ul>
            </section>
            }
            </>
    )
}