import {useSelector} from "react-redux";
import {formatTimeHour} from "../mixins/mixins.tsx";
import {StateWeather, WeatherStateDataObject} from "../data/data.tsx";

export default function MoreDetailsData() {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)
    const isDay: boolean = data.current.dt > data.daily[0].sunrise && data.current.dt < data.daily[0].sunset

    function getWindDirection(degree: number): string {
        if (degree >= 337.5 || (degree >= 0 && degree < 22.5)) {
            return "N";
        } else if (degree >= 22.5 && degree < 67.5) {
            return "NE";
        } else if (degree >= 67.5 && degree < 112.5) {
            return "E";
        } else if (degree >= 112.5 && degree < 157.5) {
            return "SE";
        } else if (degree >= 157.5 && degree < 202.5) {
            return "S";
        } else if (degree >= 202.5 && degree < 247.5) {
            return "SW";
        } else if (degree >= 247.5 && degree < 292.5) {
            return "W";
        } else if (degree >= 292.5 && degree < 337.5) {
            return "NW";
        } else {
            return "Grados no válidos";
        }
    }

    function getMoonPhaseText(phase: number): string {
        if (phase < 0.25) {
            return "Fase inicial de crecimiento"
        } else if (phase >= 0.25 && phase < 0.5) {
            return "Primer cuarto de luna"
        } else if (phase >= 0.5 && phase < 0.75) {
            return "Luna llena";
        } else if (phase >= 0.75 && phase < 1) {
            return "Último cuarto de luna";
        } else {
            return "Fase final de disminución";
        }
    }

    return (
        <>
            { data.daily &&
                <section className="sm:col-span-2">
                    <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        <li
                            className="
                            col-span-2
                            rounded-xl
                            bg-blue-100
                            p-4
                            h-full
                            min-h-[10rem]
                            flex
                            flex-row
                            items-center
                            justify-between
                            relative
                            before:absolute
                            before:inset-0
                            before:bg-[url('/assets/img/sun.webp')]
                            before:bg-[size:35%]
                            before:bg-no-repeat
                            before:bg-center
                            before:pointer-events-none
                            before:opacity-30
                            "
                        >
                            <div className={`${isDay ? "text-sm" : "text-xl"} self-start`}>
                                <p>Amanecer</p>
                                <i className="pi pi-arrow-up text-xs"></i>
                                <i className="pi pi-sun"></i>
                                <span className="ml-2">{ formatTimeHour(data.daily[0].sunrise, data.timezone_offset) }</span>
                            </div>
                            <div className={`${isDay ? "text-xl" : "text-sm"} self-end`}>
                                <p>Atardecer</p>
                                <i className="pi pi-arrow-down text-xs"></i>
                                <i className="pi pi-sun"></i>
                                <span className="ml-2">{ formatTimeHour(data.daily[0].sunset, data.timezone_offset) }</span>
                            </div>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p>Percepción humana</p>
                            <p className="text-3xl">{ Math.round(data.current.main.feels_like) }º</p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p><abbr className="no-underline" title="Percepción">Perc.</abbr> humana durante el día</p>
                            <p className="text-sm flex flex-col">
                                <span>Mañana: { Math.round(data.daily[0].feels_like.morn) }º</span>
                                <span>Tarde: { Math.round(data.daily[0].feels_like.eve) }º</span>
                                <span>Noche: { Math.round(data.daily[0].feels_like.night) }º</span>
                            </p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p className="flex flex-col gap-y-1">
                                <span>Humedad</span>
                                { data.daily[0].dew_point
                                    &&
                                    <span className="text-xs">El punto de rocío está en { Math.round(data.daily[0].dew_point) }º</span>
                                }
                            </p>
                            <p className="text-3xl">{ Math.round(data.current.main.humidity) }º</p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p>Presión atmosférica</p>
                            <p className="text-3xl">{ Math.round(data.current.main.pressure) }<sub className="text-sm ml-1">hPa</sub></p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p className="flex flex-col gap-y-1">
                                <span>Velocidad del viento</span>
                                { data.daily[0].wind_gust
                                    &&
                                    <span className="text-xs">Rachas de { data.daily[0].wind_gust }<sub className="ml-1">m/s</sub></span>
                                }
                            </p>
                            <p className="text-3xl">{ data.current.wind.speed }<sub className="text-sm ml-1">m/s</sub></p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p>Dirección del viento: <span className="font-bold ml-1">{ getWindDirection( data.current.wind.deg ) }</span></p>
                            <p className="flex items-center justify-center">
                                <i className="pi pi-arrow-up text-5xl scale-x-75" style={{ transform: `rotateZ(${data.current.wind.deg}deg)` }}></i>
                            </p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 ">
                            <p>Visibilidad</p>
                            <p className="text-3xl">{ (data.current.visibility / 1000).toFixed(1) }<sub className="text-sm ml-1">Km</sub></p>
                        </li>
                        <li className="rounded-xl bg-blue-100 p-4 h-full grid grid-flow-row content-between gap-y-4 min-h-[10rem]">
                            <p>Abundancia de nubes</p>
                            <p className="text-3xl">{ data.daily[0].clouds }º</p>
                        </li>
                        <li
                            className="
                            text-sm
                            col-span-2
                            rounded-xl
                            bg-blue-100
                            p-4
                            h-full
                            min-h-[10rem]
                            grid
                            grid-rows-3
                            content-between
                            items-center
                            relative
                            before:absolute
                            before:inset-0
                            before:bg-[url('/assets/img/moon.webp')]
                            before:bg-[size:35%]
                            before:bg-no-repeat
                            before:bg-[90%]
                            before:pointer-events-none
                            before:opacity-30
                            "
                        >
                            <div>
                                <p className="font-bold">Salida:</p>
                                <p>{ formatTimeHour(data.daily[0].moonrise, data.timezone_offset) }</p>
                            </div>
                            <div>
                                <p className="font-bold">Fase:</p>
                                <p>{ getMoonPhaseText( data.daily[0].moon_phase ) }</p>
                            </div>
                            <div>
                                <p className="font-bold">Puesta:</p>
                                <p>{ formatTimeHour(data.daily[0].moonset, data.timezone_offset) }</p>
                            </div>
                        </li>
                    </ul>
                </section>
            }
        </>
    )
}
