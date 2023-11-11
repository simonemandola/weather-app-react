import {useEffect, useState} from "react";
import { Chart } from 'primereact/chart';
import {getOneCallWeatherData} from "../mixins/weatherFetch.tsx";

export default function GraphTemperature() {

    const [ data, setData ] = useState({})
    const [ isLoading, setLoading ] = useState(true)
    const [ temperatures, setTemperatures ] = useState([] as string[])
    const [ hourLabels, setHourLabels ] = useState([] as string[])

    const textColor = "#2a2a2a"
    const textColorSecondary = "#pink"
    const surfaceBorder = ""

    const dataChar = {
        labels: hourLabels,
        datasets: [
            {
                label: '',
                data: temperatures,
                fill: true,
                borderColor: textColor,
                tension: 0.5
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: .75,
        layout: {
            padding: 10
        },
        plugins: {
            title: {
                display: true,
                text: 'Gráfico de temperatura',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };

    useEffect(() => {
        getOneCallWeatherData().then(data => {
            data.hourly = data.hourly.splice(0, 13)
            data.hourly.map((hour: number)=> {
                setHourLabels((value)=> [...value, (new Date(hour.dt * 1000).getHours().toString())])
                setTemperatures((value)=> [...value, hour.temp])
            })
            console.log("TEMP", temperatures)
            setData(data)
            setLoading((prevState)=> !prevState)
        })
    }, []);

    return (
        <>
            { isLoading
                ? <></>
                : <section>
                    <Chart type="line" data={dataChar} options={options} />
                </section>
            }
        </>
    )
}