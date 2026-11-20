/**
 * Logotipo em texto: "Sabor de Casa" com um pequeno selo de panela.
 */
export default function Marca({ clara = false, subtitulo }) {
    const corTexto = clara ? 'text-white' : 'text-cafe';
    const corSubtitulo = clara ? 'text-white/70' : 'text-cafe-claro';

    return (
        <span className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-barro text-white shadow-sm">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M3 11h18M5 11v3a7 7 0 0 0 14 0v-3M9 7c0-1 1-1.5 1-2.5M13 7c0-1 1-1.5 1-2.5" />
                </svg>
            </span>
            <span className="leading-tight">
                <span className={`block font-display text-xl font-bold ${corTexto}`}>Sabor de Casa</span>
                {subtitulo && <span className={`block text-xs ${corSubtitulo}`}>{subtitulo}</span>}
            </span>
        </span>
    );
}
