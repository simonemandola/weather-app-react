import {useEffect, useState} from "react";
import {getOneCallWeatherData} from "../mixins/weatherFetch.tsx";

export default function DailyWeatherData() {

    const [ data, setData ] = useState({})
    const [ isLoading, setLoading ] = useState(true)

    function formatTime(time: number): string {
        return new Date( new Date(time * 1000) ).toLocaleDateString('es', {weekday: 'long'})
    }

    useEffect(() => {
        getOneCallWeatherData().then(data => {
            console.log(data)
            data.daily.map((day: object) => {
                day.dt = formatTime(day.dt)
                day.weatherIcon = day.weather[0].icon
            })
            setData(data)
            console.log(">>", data)
            setLoading((prevState)=> !prevState)
        })
    }, []);

    return (
        <>
            { isLoading
                ? <></>
                : <section>
                    <h2>Previsión 7 días</h2>
                    <ul>
                        { data.daily.map((day: object, index: number) => {
                            return <li key={index}>
                                <p>{ index == 0 ? 'Hoy' : day.dt }</p>
                                <p>{ day.temp.min }</p>
                                <p>{ day.temp.max }</p>
                                <p>{ day.weatherIcon }</p>
                            </li>
                        }) }
                    </ul>
                </section>
            }
        </>
    )
}
