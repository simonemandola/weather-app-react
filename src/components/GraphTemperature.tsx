import {useEffect, useState} from "react";
import {Chart} from 'primereact/chart';
import {useSelector} from "react-redux";
import {formatTimeHour} from "../mixins/mixins.tsx";
import {StateSystem, StateWeather, WeatherStateDataObject} from "../data/data.tsx";

export default function GraphTemperature() {

    const data: WeatherStateDataObject = useSelector((state: StateWeather) => state.weatherData.value)
    const isMobile: boolean = useSelector((state: StateSystem) => state.system.value.isMobile)
    const [ temperatures, setTemperatures ] = useState([] as number[])
    const [ hourLabels, setHourLabels ] = useState([] as string[])

    const textColor = "#043d75"
    const textColorSecondary = textColor
    const surfaceBorder = `${textColor}08`

    const dataChart = {
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

        if (data.hourly.length > 0) {

            // Reset data
            setHourLabels([])
            setTemperatures([])

            // Update chart data
            data.hourly.map((hour, index: number): void => {
                if (index < 13) {
                    setHourLabels((value: string[])=> [...value, formatTimeHour(hour.dt, data.timezone_offset) as string])
                    setTemperatures((value: number[])=> [...value, hour.temp])
                }
            })

            dataChart.labels = hourLabels
            dataChart.datasets[0].data = temperatures

        }

    }, [])

    return (
        <>
            { data.hourly &&
                <section className="bg-blue-100 h-fit p-4 rounded-xl">
                    <Chart type="line" data={dataChart} options={options} />
                </section>
            }
        </>
    )
}