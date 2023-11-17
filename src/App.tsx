import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {updateWeatherData} from "./features/weatherDataSlice.jsx";
import {updateSystemIsMobileState} from "./features/systemSlice.jsx"
import {getAirPollution, getCurrentWeatherData, getOneCallWeatherData} from "./mixins/weatherFetch.tsx";

import MainWeatherData from "./components/MainWeatherData";
import TopBar from "./components/TopBar";
import HourlyWeatherData from "./components/HourlyWeatherData.tsx";
import DailyWeatherData from "./components/DailyWeatherData.tsx";
import GraphTemperature from "./components/GraphTemperature.tsx";
import HourlyDetailsData from "./components/HourlyDetailsData.tsx";
import MoreDetailsData from "./components/MoreDetailsData.tsx";
import Loading from "./components/Loading.tsx";
import AirPollution from "./components/AirPollution.tsx";
import FooterComponent from "./components/FooterComponent.tsx";
import MapLocation from "./components/MapLocation.tsx";
import {DefaultGeolocation} from "./data/data.tsx";
import UvIndex from "./components/UvIndex.tsx";

export default function App() {

    const data = useSelector((state) => state.weatherData.value)
    const system = useSelector((state) => state.system.value)
    const dispatch = useDispatch()
    const [ isLoading, setIsLoading ] = useState(true)

    function getBulkWeatherData(lat: number, lon: number, isNewSearch: boolean = false): void {
        setIsLoading( true )
        if (window.localStorage.getItem("weather") === null || isNewSearch) {
            console.log("fetching new data...")
            getOneCallWeatherData(lat, lon)
                .then((oneCallData: object): void => {
                    getCurrentWeatherData(lat, lon).then((data) => {
                        Object.assign(oneCallData, { current: data })
                        return oneCallData
                    }).then((oneCallData: object): void => {
                        getAirPollution(lat, lon).then((data: object): void => {
                            Object.assign(oneCallData, {
                                airPollution: data,
                                create_date: Date.now()
                            })
                            dispatch(updateWeatherData(oneCallData))
                            window.localStorage.setItem("weather", JSON.stringify(oneCallData))
                            setIsLoading(false)
                        })
                    })
                })
        } else {

            dispatch(updateWeatherData(JSON.parse(window.localStorage.getItem("weather") as string)))
            const dataLocalStorage = JSON.parse(window.localStorage.getItem("weather") as string)

            const createDateMore5minutes: number =
                new Date(new Date(dataLocalStorage.create_date).setMinutes(new Date(dataLocalStorage.create_date).getMinutes() + 5)).valueOf()

            if (Date.now() >= createDateMore5minutes) {
                getBulkWeatherData(dataLocalStorage.lat, dataLocalStorage.lon, true)
            }

            setIsLoading(false)
        }
    }

    function saveCurrentPosition(position: object) {
        getBulkWeatherData(position.coords.latitude, position.coords.longitude)
    }

    function geolocationError(e: { message: string }): void {
        console.warn(e.message)
        // fetch default location
        getBulkWeatherData(DefaultGeolocation.lat, DefaultGeolocation.lon, true)
    }

    useEffect(() => {
        if (window.localStorage.getItem("weather") === null) {
            navigator.geolocation.getCurrentPosition(saveCurrentPosition, geolocationError)
        } else {
            const dataLocalStorage = JSON.parse(window.localStorage.getItem("weather") as string)
            getBulkWeatherData(dataLocalStorage.lat, dataLocalStorage.lon)
        }

    }, []);

    useEffect(() => {

        dispatch(updateSystemIsMobileState( window.innerWidth < 901 ))

        window.addEventListener("resize", ()=> {
            dispatch(updateSystemIsMobileState( window.innerWidth < 901 ))
        })

    }, [system.value]);

  return (
      <>
          <TopBar getBulkWeatherData={ getBulkWeatherData } />
          <main className="max-w-5xl mx-auto my-0 grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4 px-4 pb-28">
              { isLoading
                  ? <Loading />
                  : (<>
                      <MainWeatherData />
                      <HourlyWeatherData />
                      <GraphTemperature />
                      <HourlyDetailsData />
                      <div className="grid row-auto gap-y-4">
                          <AirPollution />
                          <MapLocation />
                      </div>
                      <div className="grid row-auto gap-y-4">
                          <DailyWeatherData />
                          <UvIndex />
                      </div>
                      <MoreDetailsData />
                      <p className="text-xs text-center sm:col-span-2 text-gray-400 mt-10">
                          <a href={`https://maps.apple.com/?ll=${data.lat}%2C${data.lon}`} target="_blank">
                              Abrir en Maps
                              <i className="pi pi-external-link text-xs ml-2"></i>
                          </a>
                      </p>
                      <p className="text-xs text-center sm:col-span-2 text-gray-400">
                          <a href={`https://www.google.com/maps/search/?api=1&query=${data.lat}%2C${data.lon}`} target="_blank">
                              Abrir en Google Maps
                              <i className="pi pi-external-link text-xs ml-2"></i>
                          </a>
                      </p>
                      <p className="text-xs text-center sm:col-span-2 text-gray-400">Tiempo en { data.current.name } - { data.current.sys.country }</p>
                      <p className="text-xs text-center sm:col-span-2 text-gray-400">
                          Datos meteorológicos: <a href="https://openweathermap.org/" target="_blank" className="underline">https://openweathermap.org/</a>
                      </p>
                      <p className="text-xs text-center sm:col-span-2 text-gray-400">
                          <a href="https://github.com/simonemandola/weather-app-react/issues" target="_blank" className="underline">
                              <i className="pi pi-info-circle text-xs mr-2"></i>
                              Informar de un problema
                          </a>
                      </p>
                  </>)
              }
          </main>
          <FooterComponent />
      </>
  )
}
