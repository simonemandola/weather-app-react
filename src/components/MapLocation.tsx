import "mapbox-gl/dist/mapbox-gl.css"
import mapboxGl from "mapbox-gl"
import {useSelector} from "react-redux"
import {useEffect, useRef} from "react"
import {WeatherStateDataObject, StateWeather} from "../data/data.tsx";

export default function MapLocation() {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)
    const containerMap = useRef(null)

    useEffect(() => {
        mapboxGl.accessToken =  import.meta.env.VITE_MAPBOX_PK
        new mapboxGl.Map({
            // @ts-ignore
            container: containerMap.current.id, // container ID
            style: "mapbox://styles/mapbox/outdoors-v11", // style URL
            center: [data.lon, data.lat], // starting position [lng, lat]
            zoom: 11, // starting zoom
            maxZoom: 16,
            minZoom: 4,
            // @ts-ignore
            language: "es-ES",
        })
    }, [])


    return(
        <section ref={containerMap} id="map" className="rounded-xl min-h-[25.4rem]"></section>
    )
}