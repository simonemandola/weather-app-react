import { useState, useEffect } from "react";
import {getCurrentWeatherData} from "../mixins/weatherFetch.tsx";

export default function MainWeatherData() {

    const [ data, setData ] = useState({})
    const [ isLoading, setLoading ] = useState(true)

    useEffect(() => {
        getCurrentWeatherData().then(data => {
            setData(data)
            setLoading((prevState)=> !prevState)
            console.log(data)
        })
    }, [])

    return (
        <>
            { isLoading
                ? <p>Loading...</p>
                : (
                    <section>
                        <h1>Main data</h1>
                        <p>Temp: { data.main.temp.toFixed(0) }º</p>
                        <p>Max: { data.main.temp_max.toFixed(0) }º</p>
                        <p>Min: { data.main.temp_min.toFixed(0) }º</p>
                        <p>Description: { data.weather[0].description.charAt(0).toUpperCase().concat(data.weather[0].description.slice(1)) }</p>
                        <p>Time: { `${new Date( new Date(data.dt * 1000) ).getHours()}:${(new Date( new Date(data.dt * 1000) ).getMinutes()).toString().padStart( 2, '0')}` }</p>
                        <p>Name: { data.name }</p>
                    </section>
                )
            }
        </>
    )
}