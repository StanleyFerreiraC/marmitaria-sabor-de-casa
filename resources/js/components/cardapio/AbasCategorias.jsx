import { useEffect, useRef } from 'react';

function estiloAba(ativa) {
    const base = 'whitespace-nowrap rounded-xl border px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition';
    return ativa
        ? `${base} border-destaque bg-destaque text-sobre-destaque shadow-lg shadow-destaque/20`
        : `${base} border-borda bg-superficie text-texto-suave hover:border-texto-suave hover:text-texto`;
}

/**
 * Abas de categoria que acompanham a rolagem: a aba da seção visível fica em destaque.
 */
export default function AbasCategorias({ categorias, secaoAtiva, aoSelecionarTodos, aoSelecionarCategoria }) {
    const abaAtivaRef = useRef(null);

    useEffect(() => {
        abaAtivaRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [secaoAtiva]);

    return (
        <nav aria-label="Categorias do cardápio" className="sem-barra-rolagem -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            <button type="button" ref={secaoAtiva ? null : abaAtivaRef} onClick={aoSelecionarTodos} className={estiloAba(!secaoAtiva)}>
                Todos
            </button>
            {categorias.map((categoria) => {
                const ativa = secaoAtiva === `categoria-${categoria.id}`;
                return (
                    <button
                        key={categoria.id}
                        type="button"
                        ref={ativa ? abaAtivaRef : null}
                        aria-current={ativa ? 'true' : undefined}
                        onClick={() => aoSelecionarCategoria(`categoria-${categoria.id}`)}
                        className={estiloAba(ativa)}
                    >
                        {categoria.nome}
                    </button>
                );
            })}
        </nav>
    );
}
