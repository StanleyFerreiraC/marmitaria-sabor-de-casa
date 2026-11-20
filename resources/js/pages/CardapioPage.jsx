import CabecalhoPagina from '../components/CabecalhoPagina';
import EstadoDaPagina from '../components/EstadoDaPagina';
import { useDados } from '../hooks/useDados';
import { cardapioService } from '../services/pratoService';
import { cartao } from '../utils/estilos';
import { formatarPreco } from '../utils/formatarPreco';

/**
 * Cardápio para o cliente: sempre atualizado, só com os pratos disponíveis.
 */
export default function CardapioPage() {
    const { dados: categorias, carregando, erro } = useDados(cardapioService.buscar, []);

    return (
        <>
            <CabecalhoPagina titulo="Cardápio de hoje" subtitulo="Preços e pratos sempre atualizados pela Sabor de Casa." />
            <EstadoDaPagina carregando={carregando} erro={erro}>
                {categorias?.length === 0 && (
                    <p className={`${cartao} p-8 text-center text-sm text-stone-500`}>Nenhum prato disponível no momento.</p>
                )}
                <div className="grid gap-6">
                    {categorias?.map((categoria) => (
                        <section key={categoria.id} className={`${cartao} p-6`}>
                            <h2 className="text-lg font-semibold text-orange-700">{categoria.nome}</h2>
                            {categoria.descricao && <p className="text-sm text-stone-500">{categoria.descricao}</p>}
                            <ul className="mt-4 divide-y divide-stone-100">
                                {categoria.pratos.map((prato) => (
                                    <li key={prato.id} className="flex items-baseline justify-between gap-4 py-3">
                                        <div>
                                            <p className="font-medium text-stone-900">{prato.nome}</p>
                                            {prato.descricao && <p className="text-sm text-stone-500">{prato.descricao}</p>}
                                        </div>
                                        <span className="whitespace-nowrap font-semibold">{formatarPreco(prato.preco)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </EstadoDaPagina>
        </>
    );
}
