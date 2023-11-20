import {useSelector} from "react-redux";
import scrollToTheTop from "../mixins/mixins.tsx"
import SearchCityForm from "./SearchCityForm.tsx";
import {DefaultGeolocation, SearchCityFormProps, StateWeather, WeatherStateDataObject} from "../data/data.tsx";
import {useState} from "react";

export default function TopBar({ getBulkWeatherData }: SearchCityFormProps) {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)
    const [ isLoading, setIsLoading ] = useState(false)

    function getMyGeolocation(): void {
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            getBulkWeatherData(position.coords.latitude, position.coords.longitude, true)
            setIsLoading(false)
        }, ()=> {
            getBulkWeatherData(DefaultGeolocation.lat, DefaultGeolocation.lon, true)
            setIsLoading(false)
        })
    }

    return (
        <>
            { data.current &&
                <header className="top-0 px-4 py-2 h-16 box-border sticky grid grid-cols-header justify-center justify-items-center gap-x-3 max-w-5xl mx-auto my-0 z-50 before:shadow-md before:bg-gray-200 before:absolute before:opacity-95 before:backdrop-blur-md before:h-full before:top-0 before:-z-10 before:w-screen">
                    <h1 className="w-full h-full flex items-center" onClick={ scrollToTheTop }>
                        <p className="my-auto line-clamp-1 font-bold hover:cursor-pointer">
                            { data.current.name } { Math.round(data.current.main.temp) }º - { data.current.sys.country }
                        </p>
                    </h1>
                    <button type="button" className="w-10 h-5/6 my-auto flex items-center justify-center rounded-xl shadow bg-gray-200 hover:bg-gray-300 hover:shadow-md transition-all duration-500" onClick={ getMyGeolocation }>
                        { isLoading
                            ? <i className="pi pi-spinner animate-spin" />
                            : <i className="pi pi-map-marker text-xl" />
                        }
                    </button>
                    <SearchCityForm getBulkWeatherData={ getBulkWeatherData } />
                </header>
            }
            </>
    )
}