import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl'
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";

export default function MapLocation() {

    const data = useSelector((state) => state.weatherData.value)
    const containerMap = useRef(null)

    useEffect(() => {
        new mapboxgl.Map({
            accessToken: "pk.eyJ1Ijoic2ltb25lbWFuZG9sYSIsImEiOiJja3djYTY3cmkzc3dtMzByb2NnaXFqdGd3In0.LkO9Y9a2d2o50nNLp476eQ",
            container: containerMap.current, // container ID
            style: "mapbox://styles/mapbox/outdoors-v11", // style URL
            center: [data.lon, data.lat], // starting position [lng, lat]
            zoom: 11, // starting zoom
            maxZoom: 16,
            minZoom: 4,
            language: "es"
        });
    }, []);


    return(
        <section ref={containerMap} className="rounded-xl min-h-[25.4rem]"></section>
    )
}