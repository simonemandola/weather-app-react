import {useSelector} from "react-redux";
import scrollToTheTop from "../mixins/mixins.tsx"
import SearchCityForm from "./SearchCityForm.tsx";

export default function TopBar({ getBulkWeatherData }) {

    const data = useSelector((state) => state.weatherData.value)

    return (
        <>
            { data.current &&
                <header className="top-0 px-4 py-2 h-16 box-border sticky grid grid-cols-header justify-center justify-items-center gap-x-2 max-w-5xl mx-auto my-0 z-50 before:shadow-md before:bg-gray-200 before:absolute before:opacity-95 before:backdrop-blur-md before:h-full before:top-0 before:-z-10 before:w-screen">
                    <h1 className="w-full flex items-center">
                        <p className="line-clamp-1 font-bold" onClick={ scrollToTheTop }>
                            { data.current.name } { Math.round(data.current.main.temp) }º - { data.current.sys.country }
                        </p>
                    </h1>
                    <SearchCityForm getBulkWeatherData={ getBulkWeatherData } />
                </header>
            }
            </>
    )
}