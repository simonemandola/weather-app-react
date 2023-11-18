import { useSelector } from "react-redux"
import AlertsWeather from "./AlertsWeather.tsx";
import {MutableRefObject, useRef, useState} from "react";
import {StateWeather, WeatherStateDataObject} from "../data/data.tsx";

export default function MainWeatherData() {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)
    const [ opacity, setOpacity ] = useState(1)
    const sectionRef: MutableRefObject<HTMLElement | null> = useRef(null)

    window.addEventListener("scroll", ()=> {
        if (!sectionRef.current)
            return

        const extraSectionHeight: number = 36
        const sectionOffsetHeight: number = sectionRef.current.offsetHeight
        setOpacity(
            (sectionOffsetHeight + extraSectionHeight - window.scrollY + 1)
            / sectionOffsetHeight
        )
    })

    return (
        <>
            { data.current && (
                <section
                    ref={sectionRef}
                    className="mt-20 flex flex-col gap-y-2 items-center justify-center sm:col-span-2 sticky top-[8rem] -z-10 transition-opacity duration-75"
                    style={{ opacity, transform: `translateY(-${opacity*0.5}rem)` }}
                >
                    <img
                        className="w-20 h-auto"
                        src={`src/assets/img/icons/${data.current.weather[0].icon}.png`}
                        alt={ data.current.weather[0].description }
                    />
                    <p className="font-bold text-7xl after:content-['º'] after:absolute">{ Math.round(data.current.main.temp) }</p>
                    <p className="flex gap-x-4 items-center justify-center">
                        <span>Min: { Math.round(data.daily[0].temp.min) }º</span>
                        <span>Máx: { Math.round(data.daily[0].temp.max) }º</span>
                    </p>
                    <p>{ data.current.weather[0].description.charAt(0).toUpperCase().concat(data.current.weather[0].description.slice(1)) }</p>
                    { data.alerts && <AlertsWeather alerts={ data.alerts } />}
                </section>
            )}
        </>
    )
}