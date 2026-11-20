import { tituloSecao } from '../utils/estilos';

export default function CabecalhoPagina({ titulo, subtitulo, acoes }) {
    return (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className={`text-2xl sm:text-3xl ${tituloSecao}`}>{titulo}</h1>
                {subtitulo && <p className="mt-2 text-sm text-texto-suave">{subtitulo}</p>}
            </div>
            {acoes && <div className="flex flex-wrap gap-2">{acoes}</div>}
        </div>
    );
}
