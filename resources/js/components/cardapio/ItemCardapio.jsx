import { formatarPreco } from '../../utils/formatarPreco';
import ImagemPrato from '../ImagemPrato';

/**
 * Prato na lista do cardápio: foto à esquerda, nome, preço e descrição à direita.
 */
export default function ItemCardapio({ prato }) {
    return (
        <li className="flex min-h-28 overflow-hidden rounded-2xl border border-borda bg-superficie transition hover:border-destaque/50">
            <ImagemPrato url={prato.imagem_url} nome={prato.nome} className="w-28 shrink-0 self-stretch sm:w-36" />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-sm leading-tight font-extrabold uppercase text-texto sm:text-base">{prato.nome}</h3>
                    {prato.destaque && (
                        <span title="Destaque da casa" className="shrink-0 rounded-full border border-destaque/40 px-2 py-0.5 text-[10px] font-bold uppercase text-destaque">
                            Destaque
                        </span>
                    )}
                </div>
                <p className="font-display font-bold text-destaque">{formatarPreco(prato.preco)}</p>
                {prato.descricao && <p className="line-clamp-2 text-sm text-texto-suave">{prato.descricao}</p>}
            </div>
        </li>
    );
}
