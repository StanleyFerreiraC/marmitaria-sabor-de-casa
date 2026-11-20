export default function BuscaCardapio({ valor, aoMudar }) {
    return (
        <div className="relative">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-texto-suave" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
            </svg>
            <input
                type="search"
                value={valor}
                onChange={(evento) => aoMudar(evento.target.value)}
                placeholder="O que você deseja hoje?"
                aria-label="Buscar no cardápio"
                className="w-full rounded-2xl border border-borda bg-superficie py-3 pr-10 pl-12 text-texto placeholder:text-texto-suave outline-none transition focus:border-destaque focus:ring-2 focus:ring-destaque/20 [&::-webkit-search-cancel-button]:hidden"
            />
            {valor && (
                <button
                    type="button"
                    onClick={() => aoMudar('')}
                    aria-label="Limpar busca"
                    className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-superficie-alta text-texto-suave hover:text-texto"
                >
                    ×
                </button>
            )}
        </div>
    );
}
