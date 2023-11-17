import {useSelector} from "react-redux";

export default function DailyWeatherData() {

    const data = useSelector((state) => state.weatherData.value)

    const columns = [
        "Día",
        "Temp. min.",
        "Temp. máx.",
        "",
    ]

    return (
        <>
            { data.daily && <section className="rounded-xl bg-blue-100 p-4 h-fit">
                <h2 className="mb-4">Previsión 7 días</h2>
                <p className="my-4 pl-4 text-xs font-bold w-full grid grid-cols-4 gap-x-2 items-center justify-between">
                    { columns.map( (columnName: string, index: number) =>  {
                        return <span key={index}>{ columnName }</span>
                    }) }
                </p>
                <ul className="[&>li:nth-child(odd)]:bg-gray-100 overflow-scroll h-auto sm:h-[18rem]">
                    { data.daily.map((day: object, index: number) => {
                        return (<li key={index} className="w-full grid grid-cols-4 gap-x-2 items-center justify-between p-4 box-border rounded-xl">
                            <p className="capitalize">{ index == 0 ? 'Hoy' : day.dt }</p>
                            <p className="text-center">{ Math.round(day.temp.min) }º</p>
                            <p className="text-center">{ Math.round(day.temp.max) }º</p>
                            <img
                                className="max-w-[2rem] justify-self-end"
                                src={`src/assets/img/icons/${day.weather[0].icon}.png`}
                                alt={day.weather[0].description}
                            />
                        </li>)
                    })}
                </ul>
            </section>
            }
        </>
    )
}
