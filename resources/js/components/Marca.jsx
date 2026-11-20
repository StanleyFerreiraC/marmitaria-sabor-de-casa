/**
 * Logotipo em texto: selo de panela + "Sabor de Casa".
 */
export default function Marca({ subtitulo }) {
    return (
        <span className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-destaque text-sobre-destaque">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 11h18M5 11v3a7 7 0 0 0 14 0v-3M9 7c0-1 1-1.5 1-2.5M13 7c0-1 1-1.5 1-2.5" />
                </svg>
            </span>
            <span className="leading-tight">
                <span className="block font-display text-lg font-extrabold text-texto">Sabor de Casa</span>
                {subtitulo && <span className="block text-xs text-texto-suave">{subtitulo}</span>}
            </span>
        </span>
    );
}
