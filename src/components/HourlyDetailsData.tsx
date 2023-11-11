import {useEffect, useState} from "react";
import {getOneCallWeatherData} from "../mixins/weatherFetch.tsx";

export default function HourlyDetailsData() {

    const [ data, setData ] = useState({})
    const [ isLoading, setLoading ] = useState(true)

    useEffect(() => {
        getOneCallWeatherData().then(data => {
            setData(data)
            setLoading((prevState)=> !prevState)
        })
    }, []);

    return (
        <>
            { isLoading
                ? <></>
                : <section>
                    <h2>Previsión detallada por horas</h2>
                    <ul>
                        {data.hourly.slice(0, 25).map(
                            (weather: object, index: number) =>
                                <li key={index} style={{ display: 'flex', gap: '1rem' }}>
                                    <p>{ index == 0 ? 'Ahora' : new Date(new Date(weather.dt * 1000)).getHours() }</p>
                                    <p>{ weather.temp.toFixed(0) }º</p>
                                    <p>{ weather.clouds }%</p>
                                    <p>{ weather.pop * 100 }%</p>
                                    <p>{ weather.humidity }%</p>
                                    <p>{ weather.uvi }</p>
                                    <p>{ weather.wind_speed }</p>
                                    <p>{ weather.wind_deg }º</p>
                                </li>
                        )}
                    </ul>
                </section>
            }
        </>
    )
}