import {useEffect, useState} from "react";
import {Chart} from 'primereact/chart';
import {useSelector} from "react-redux";
import {formatTimeHour} from "../mixins/mixins.tsx";

export default function GraphTemperature() {

    const isMobile = useSelector((state) => state.system.value.isMobile)
    const data = useSelector((state) => state.weatherData.value)
    const [ temperatures, setTemperatures ] = useState([] as string[])
    const [ hourLabels, setHourLabels ] = useState([] as string[])

    const textColor = "#043d75"
    const textColorSecondary = textColor
    const surfaceBorder = `${textColor}08`

    const dataChar = {
        labels: hourLabels,
        datasets: [
            {
                data: temperatures,
                fill: true,
                borderColor: textColor,
                tension: .5,
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        layout: {
            padding: isMobile ? 0 : 10
        },
        plugins: {
            title: {
                display: true,
                text: "Gráfico de temperatura",
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    }

    useEffect(() => {
        if (data.hourly) {

            // Reset data
            setHourLabels([])
            setTemperatures([])

            // Update chart data
            data.hourly.map((hour: number, index: number): void => {
                if (index < 13) {
                    setHourLabels((value: string[])=> [...value, formatTimeHour(hour.dt, data.timezone_offset) as string])
                    setTemperatures((value)=> [...value, hour.temp])
                }
            })
        }
    }, []);

    return (
        <>
            { data.hourly &&
                <section className="bg-blue-100 h-fit p-4 rounded-xl">
                    <Chart type="line" data={dataChar} options={options} />
                </section>
            }
        </>
    )
}