import {useEffect, useState} from "react";
import {getOneCallWeatherData} from "../mixins/weatherFetch.tsx";

export default function HourlyWeatherData() {

    const [ data, setData ] = useState({})
    const [ isLoading, setLoading ] = useState(true)
    const minPopValue = 0.3

    useEffect(() => {
        getOneCallWeatherData().then(data => {
            console.log(data)
            setData(data)
            setLoading((prevState)=> !prevState)
        })
    }, []);

    return (
        <>
            { isLoading
                ? <></>
                : <section>
                    <h2>Próximas 24 horas</h2>
                    <ul style={{ display: 'flex', gap: '1.5rem' }}>
                        {data.hourly.slice(0, 25).map(
                            (weather: object, index: number) =>
                                <li key={index} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <p>{ index == 0 ? 'Ahora' : new Date(new Date(weather.dt * 1000)).getHours() }</p>
                                    <p>{ weather.temp.toFixed(0) }º</p>
                                    <p>{ weather.pop < minPopValue ? '' : `${weather.pop * 100}%` }</p>
                                </li>
                        )}
                    </ul>
            </section>
            }
        </>
    )
}