export default function Loading() {
    return (
        <article className="fixed inset-0 flex items-center justify-center bg-[#FFE9AD] z-50">
            <h1 className="flex items-center justify-start gap-x-2">
                <i className="pi pi-spinner animate-spin"></i>
                Cargando...
            </h1>
        </article>
    )
}