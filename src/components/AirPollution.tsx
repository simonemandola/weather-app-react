import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AirPollutionName} from "../data/data.tsx";

export default function AirPollution() {

    const data = useSelector((state) => state.weatherData.value)
    const [ pointPosition, setPointPosition ] = useState("5%")
    const [ airPollutionText, setAirPollutionText ] = useState(AirPollutionName.AP1)

    useEffect(() => {
        switch (data.airPollution.list[0].main.aqi) {
            case 1:
                setAirPollutionText(AirPollutionName.AP1)
                setPointPosition("5%")
                break
            case 2:
                setAirPollutionText(AirPollutionName.AP2)
                setPointPosition("25%")
                break
            case 3:
                setAirPollutionText(AirPollutionName.AP3)
                setPointPosition("45%")
                break
            case 4:
                setAirPollutionText(AirPollutionName.AP4)
                setPointPosition("70%")
                break
            case 5:
                setAirPollutionText(AirPollutionName.AP5)
                setPointPosition("90%")
        }
    }, []);

    return(
        <>
            { data.airPollution
                &&
                <section className="bg-blue-100 h-fit p-4 box-border rounded-xl">
                    <h2 className="mb-4">Calidad del aire</h2>
                    <div className="w-full h-2 relative">
                        <div className="absolute bg-air-pollution inset-0 rounded"></div>
                        <div className="absolute w-2 h-2 z-10 bg-white rounded-full" style={{ left: pointPosition }}></div>
                    </div>
                    <p className="text-xs mt-4">{ airPollutionText }</p>
                </section>
            }
        </>
    )
}