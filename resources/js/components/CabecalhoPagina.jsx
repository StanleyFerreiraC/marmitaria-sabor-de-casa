export default function CabecalhoPagina({ titulo, subtitulo, acoes }) {
    return (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold text-stone-900">{titulo}</h1>
                {subtitulo && <p className="mt-1 text-sm text-stone-500">{subtitulo}</p>}
            </div>
            {acoes && <div className="flex flex-wrap gap-2">{acoes}</div>}
        </div>
    );
}
