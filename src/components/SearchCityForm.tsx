import {InputText} from "primereact/inputtext";
import {useEffect, useRef, useState} from "react";
import geocodingCityName from "../mixins/weatherFetch.tsx";
import {useSelector} from "react-redux";

export default function SearchCityForm({ getBulkWeatherData }) {

    const isMobile = useSelector((state) => state.system.value.isMobile)

    const [city, setCity] = useState("")
    const [headerWidthStyle, setHeaderWidthStyle] = useState("")
    const [suggestions, setSuggestions] = useState([] as string[])
    const minChar = 2
    const searchCityForm = useRef(null)

    useEffect(() => {
        setSuggestions([]) // reset suggestion list
        if (city.length > minChar)
            geocodingCityName(city).then((data)=> { setSuggestions(data as string[]) })
    }, [city]);

    function resetForm() {
        setCity("")
        setSuggestions([])
    }

    function submitForm(lat: number, lon: number): void {
        getBulkWeatherData(lat, lon, true)
        // reset
        resetForm()
    }

    function showInputSearch(): void {
        if (isMobile)
            setHeaderWidthStyle("w-48")
    }

    window.onclick = function(event: MouseEvent): void {
        if (event.target !== searchCityForm.current && !searchCityForm.current.contains(event.target as Node)) {
            resetForm()
            setHeaderWidthStyle("")
        }
    }

    return(
        <article
            ref={searchCityForm}
            className={`${headerWidthStyle} sm:relative w-10 sm:w-auto transition-all duration-500`}
            onClick={showInputSearch}
        >
            <form className="w-full sm:w-60 relative h-full flex items-center" onSubmit={(e)=> e.preventDefault()}>
                <i className="pi pi-search absolute left-3 pointer-events-none"></i>
                <InputText
                    className="rounded-xl w-full h-5/6 hover:outline hover:outline-gray-300 transition-all pl-10"
                    placeholder="Buscar ciudad..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </form>
            { suggestions.length > 0 &&
                <ul
                    className="[&>li:nth-child(odd)]:bg-gray-100 absolute top-full shadow z-50 w-full sm:w-80 left-0 sm:-left-20 bg-blue-100 p-4 rounded-xl box-border transition-all duration-500"
                >
                    { suggestions.map((suggestion, index: number) =>
                        <li key={index} className="rounded">
                            <button
                                className="text-left p-2 box-border hover:bg-gray-200 w-full hover:underline"
                                type="button"
                                onClick={()=>
                                    submitForm(suggestion.geometry.coordinates[1], suggestion.geometry.coordinates[0])}
                            >
                                { suggestion.place_name }
                            </button>
                        </li>)}
                </ul>}
        </article>
    )
}