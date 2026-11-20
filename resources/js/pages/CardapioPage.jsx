import { Link } from 'react-router-dom';
import EstadoDaPagina from '../components/EstadoDaPagina';
import ImagemPrato from '../components/ImagemPrato';
import Marca from '../components/Marca';
import { useDados } from '../hooks/useDados';
import { cardapioService } from '../services/pratoService';
import { tituloDisplay } from '../utils/estilos';
import { formatarPreco } from '../utils/formatarPreco';
import { fotos, rotas } from '../utils/rotas';

/**
 * Cardápio público: sempre atualizado, só com os pratos disponíveis.
 */
export default function CardapioPage() {
    const { dados: categorias, carregando, erro } = useDados(cardapioService.buscar, []);

    return (
        <>
            <Capa />
            <div id="cardapio" className="mx-auto max-w-6xl px-4 pb-16">
                <EstadoDaPagina carregando={carregando} erro={erro}>
                    {categorias?.length === 0 ? (
                        <p className="py-16 text-center text-cafe-claro">Nenhum prato disponível no momento. Volte mais tarde!</p>
                    ) : (
                        <>
                            <NavegacaoCategorias categorias={categorias ?? []} />
                            {categorias?.map((categoria) => (
                                <SecaoCategoria key={categoria.id} categoria={categoria} />
                            ))}
                        </>
                    )}
                </EstadoDaPagina>
            </div>
        </>
    );
}

function Capa() {
    return (
        <header className="relative isolate overflow-hidden bg-cafe">
            <img src={fotos.capa} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-45" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cafe via-cafe/60 to-cafe/20" />
            <div className="mx-auto max-w-6xl px-4 pt-6 pb-20 sm:pb-28">
                <div className="flex items-center justify-between">
                    <Marca clara />
                    <Link to={rotas.categorias()} className="text-sm font-semibold text-white/80 hover:text-white">
                        Área do gerente
                    </Link>
                </div>
                <div className="mt-16 max-w-2xl sm:mt-24">
                    <p className="text-sm font-semibold uppercase tracking-widest text-acafrao">Cardápio de hoje</p>
                    <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
                        Comida caseira com tempero de vó.
                    </h1>
                    <p className="mt-4 text-lg text-white/80">
                        Marmitas, bebidas e sobremesas feitas todo dia. Preços e pratos sempre atualizados por aqui.
                    </p>
                    <a href="#cardapio" className="mt-8 inline-flex rounded-full bg-acafrao px-6 py-3 font-semibold text-cafe shadow-lg hover:bg-acafrao-claro">
                        Ver o cardápio
                    </a>
                </div>
            </div>
        </header>
    );
}

function NavegacaoCategorias({ categorias }) {
    return (
        <nav aria-label="Categorias do cardápio" className="sticky top-0 z-10 -mx-4 mb-4 border-b border-creme-escuro bg-creme/95 px-4 py-3 backdrop-blur">
            <ul className="flex gap-2 overflow-x-auto">
                {categorias.map((categoria) => (
                    <li key={categoria.id}>
                        <a
                            href={`#categoria-${categoria.id}`}
                            className="block whitespace-nowrap rounded-full border border-creme-escuro bg-white px-4 py-1.5 text-sm font-semibold text-cafe hover:border-barro hover:text-barro"
                        >
                            {categoria.nome}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function SecaoCategoria({ categoria }) {
    return (
        <section id={`categoria-${categoria.id}`} className="scroll-mt-20 pt-10">
            <div className="mb-6 flex items-end gap-4">
                <div>
                    <h2 className={`text-3xl ${tituloDisplay}`}>{categoria.nome}</h2>
                    {categoria.descricao && <p className="mt-1 text-cafe-claro">{categoria.descricao}</p>}
                </div>
                <span aria-hidden="true" className="mb-3 h-px flex-1 bg-gradient-to-r from-barro/40 to-transparent" />
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoria.pratos.map((prato) => (
                    <CartaoPrato key={prato.id} prato={prato} />
                ))}
            </ul>
        </section>
    );
}

function CartaoPrato({ prato }) {
    return (
        <li className="group overflow-hidden rounded-2xl border border-creme-escuro bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative">
                <ImagemPrato url={prato.imagem_url} nome={prato.nome} className="aspect-[4/3] w-full" />
                <span className="absolute right-3 bottom-3 rounded-full bg-cafe/90 px-3 py-1 font-display text-lg font-bold text-acafrao shadow">
                    {formatarPreco(prato.preco)}
                </span>
            </div>
            <div className="p-4">
                <h3 className="font-display text-xl font-semibold text-cafe">{prato.nome}</h3>
                {prato.descricao && <p className="mt-1 text-sm text-cafe-claro">{prato.descricao}</p>}
            </div>
        </li>
    );
}
