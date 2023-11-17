import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {UvIndexName} from "../data/data.tsx";

export default function UvIndex() {

    const data = useSelector((state) => state.weatherData.value)
    const [ pointPosition, setPointPosition ] = useState("5%")
    const [ uvIndexText, setUvIndexText ] = useState(UvIndexName.AP1)

    useEffect(() => {

        const uvi = data.daily[0].uvi

        if ( uvi < 3 ) {
            setUvIndexText(UvIndexName.UVIndex1)
            setPointPosition("5%")
        } else if ( uvi >= 3 && uvi < 6 ) {
            setUvIndexText(UvIndexName.UVIndex2)
            setPointPosition("25%")
        } else if ( uvi >= 6 && uvi < 8 ) {
            setUvIndexText(UvIndexName.UVIndex3)
            setPointPosition("45%")
        } else if ( uvi >= 8 && uvi < 11 ) {
            setUvIndexText(UvIndexName.UVIndex4)
            setPointPosition("70%")
        } else if ( uvi >= 11 ) {
            setUvIndexText(UvIndexName.UVIndex5)
            setPointPosition("95%")
        }
    }, []);

    return(
        <>
            { data.airPollution
                &&
                <section className="bg-blue-100 h-fit p-4 box-border rounded-xl">
                    <h2 className="mb-4 flex flex-col">
                        <span>Indice UV</span>
                        <span className="text-xs opacity-60">El valor máximo del índice UV para el día.</span>
                    </h2>

                    <div className="w-full h-2 relative">
                        <div className="absolute bg-air-pollution inset-0 rounded" />
                        <div
                            className="point relative w-2 h-2 z-10 bg-white rounded-full"
                            style={{ left: pointPosition }}
                            title={ data.daily[0].uvi }
                        />
                    </div>
                    <p className="text-sm mt-4">{ uvIndexText }</p>
                </section>
            }
        </>
    )
}