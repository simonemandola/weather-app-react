import { useState, useEffect } from "react";

export default function MainWeatherData() {

    const [ data, setData ] = useState({})

    useEffect(()=> {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=39.4078888&lon=-0.4439118&appid=9014bc217533668d1681d0858a1ca241")
            .then(r => r.json())
            .then(json => {
                setData(Object.assign(data, json))
                console.log("DATA: ", data)
            })
    }, [])

    return (
        <section>
            <h1>Main data</h1>
            { data.dt && <p>{ new Date(data.dt).getDate() }</p> }
        </section>
    )
}