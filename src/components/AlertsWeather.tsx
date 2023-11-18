import {WeatherStateDataObject} from "../data/data.tsx";

interface AlertsWeatherProps extends Pick<WeatherStateDataObject, "alerts"> {}

export default function AlertsWeather({ alerts }: AlertsWeatherProps) {
    return (
        <article className="sm:px-32 box-border mt-8">
            <p className="text-xs">
                <i className="pi pi-info-circle"></i>
                <span className="italic"> { alerts[0].description }</span>
            </p>
            <p className="text-xs text-right italic mt-4"><span className="font-bold">Fuente:</span> { alerts[0].sender_name }</p>
        </article>
    )
}
