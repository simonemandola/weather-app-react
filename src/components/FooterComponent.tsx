export default function FooterComponent() {
    return(
        <footer className="max-w-5xl mx-auto col-span-2 grid grid-cols-1 grid-rows-2 md:grid-rows-1 gap-y-8 md:grid-cols-2 items-center md:justify-between pt-10 pb-20 px-6 relative before:absolute before:border-t-2 before:border-t-blue-200 before:-z-10 before:h-full before:block before:bg-[#1a1a1a] before:justify-self-center before:w-screen">
            <p className="text-xs text-center md:text-left text-gray-100">
                <span>Desarrollado con <i className="pi pi-heart-fill text-xs text-red-700"></i>️ por </span>
                <a
                    className="underline hover:font-bold"
                    href="https://www.linkedin.com/in/simone-mandola/"
                    target="_blank"
                >
                    Simone Mandola
                </a>
            </p>
            <a
                className="flex items-center justify-end gap-x-2 w-fit justify-self-center md:justify-self-end text-gray-100"
                href="https://github.com/simonemandola/weather-app-react"
                target="_blank"
            >
                <span className="text-xs hover:underline">Repositorio Git</span>
                <i className="pi pi-github"></i>
            </a>
        </footer>
    )
}