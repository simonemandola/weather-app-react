export default function Loading() {
    return (
        <article className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#FFE9AD] to-[#f8c07f] z-50">
            <h1 className="flex items-center flex-col justify-start gap-y-2 pb-28">
                <img src="/icon.svg" width="60" height="60" alt="weather app icon" />
                <span>
                    <i className="pi pi-spinner animate-spin mr-2" />
                    Cargando...
                </span>
            </h1>
        </article>
    )
}