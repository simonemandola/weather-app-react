export default function AlertsWeather({ data }) {
    return (
        <article className="sm:px-32 box-border mt-8">
            <p className="text-xs">
                <i className="pi pi-info-circle"></i>
                <span className="italic"> { data.description }</span>
            </p>
            <p className="text-xs text-right italic mt-4"><span className="font-bold">Fuente:</span> { data.sender_name }</p>
        </article>
    )
}