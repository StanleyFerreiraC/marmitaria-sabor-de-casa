import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AbasCategorias from '../components/cardapio/AbasCategorias';
import BotaoVoltarTopo from '../components/cardapio/BotaoVoltarTopo';
import BuscaCardapio from '../components/cardapio/BuscaCardapio';
import CarrosselDestaques from '../components/cardapio/CarrosselDestaques';
import ItemCardapio from '../components/cardapio/ItemCardapio';
import EstadoDaPagina from '../components/EstadoDaPagina';
import Marca from '../components/Marca';
import { useAltura } from '../hooks/useAltura';
import { useDados } from '../hooks/useDados';
import { useSecaoAtiva } from '../hooks/useSecaoAtiva';
import { cardapioService } from '../services/pratoService';
import { tituloSecao } from '../utils/estilos';
import { filtrarPorBusca, listarDestaques } from '../utils/filtrarCardapio';
import { rotas } from '../utils/rotas';

/**
 * Cardápio público: busca, abas por categoria, destaques da casa e lista de pratos disponíveis.
 */
export default function CardapioPage() {
    const { dados, carregando, erro } = useDados(cardapioService.buscar, []);
    const [busca, setBusca] = useState('');
    const cabecalhoRef = useRef(null);
    const alturaCabecalho = useAltura(cabecalhoRef);

    const categorias = useMemo(() => filtrarPorBusca(dados ?? [], busca), [dados, busca]);
    const destaques = useMemo(() => listarDestaques(dados ?? []), [dados]);
    const idsDasSecoes = useMemo(() => categorias.map((categoria) => `categoria-${categoria.id}`), [categorias]);
    const secaoAtiva = useSecaoAtiva(idsDasSecoes, alturaCabecalho);

    function rolarAteSecao(id) {
        const secao = document.getElementById(id);
        const topo = secao.getBoundingClientRect().top + window.scrollY - alturaCabecalho - 12;
        window.scrollTo({ top: topo, behavior: 'smooth' });
    }

    return (
        <>
            <header ref={cabecalhoRef} className="sticky top-0 z-20 border-b border-borda bg-fundo/95 backdrop-blur">
                <div className="mx-auto max-w-4xl space-y-3 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <Marca subtitulo="Cardápio digital · atualizado em tempo real" />
                        <Link
                            to={rotas.categorias()}
                            aria-label="Área do gerente"
                            title="Área do gerente"
                            className="grid size-10 place-items-center rounded-xl border border-borda bg-superficie text-texto-suave hover:text-texto"
                        >
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 21a8 8 0 0 1 16 0" />
                            </svg>
                        </Link>
                    </div>
                    <BuscaCardapio valor={busca} aoMudar={setBusca} />
                    {!carregando && !erro && (
                        <AbasCategorias
                            categorias={categorias}
                            secaoAtiva={secaoAtiva}
                            aoSelecionarTodos={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aoSelecionarCategoria={rolarAteSecao}
                        />
                    )}
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-4 pb-16">
                <EstadoDaPagina carregando={carregando} erro={erro}>
                    {!busca && <CarrosselDestaques pratos={destaques} />}
                    {categorias.length === 0 ? (
                        <ResultadoVazio busca={busca} />
                    ) : (
                        categorias.map((categoria) => <SecaoCategoria key={categoria.id} categoria={categoria} />)
                    )}
                </EstadoDaPagina>
            </div>
            <BotaoVoltarTopo />
        </>
    );
}

function SecaoCategoria({ categoria }) {
    return (
        <section id={`categoria-${categoria.id}`} aria-labelledby={`titulo-categoria-${categoria.id}`} className="pt-10">
            <h2 id={`titulo-categoria-${categoria.id}`} className={`text-lg ${tituloSecao}`}>{categoria.nome}</h2>
            {categoria.descricao && <p className="mt-1 pl-4 text-sm text-texto-suave">{categoria.descricao}</p>}
            <ul className="mt-4 grid gap-3">
                {categoria.pratos.map((prato) => (
                    <ItemCardapio key={prato.id} prato={prato} />
                ))}
            </ul>
        </section>
    );
}

function ResultadoVazio({ busca }) {
    return (
        <p className="py-16 text-center text-texto-suave">
            {busca ? `Nenhum prato encontrado para "${busca}".` : 'Nenhum prato disponível no momento. Volte mais tarde!'}
        </p>
    );
}
