import { Link, useParams } from 'react-router-dom';
import CabecalhoPagina from '../components/CabecalhoPagina';
import SeloDestaque from '../components/cardapio/SeloDestaque';
import EstadoDaPagina from '../components/EstadoDaPagina';
import ImagemPrato from '../components/ImagemPrato';
import Mensagem from '../components/Mensagem';
import { useDados } from '../hooks/useDados';
import { useExclusao } from '../hooks/useExclusao';
import { categoriaService } from '../services/categoriaService';
import { pratoService } from '../services/pratoService';
import { botao, cartao } from '../utils/estilos';
import { formatarPreco } from '../utils/formatarPreco';
import { rotas } from '../utils/rotas';

async function carregarCategoriaComPratos(categoriaId) {
    const [categoria, pratos] = await Promise.all([
        categoriaService.buscar(categoriaId),
        pratoService.listarPorCategoria(categoriaId),
    ]);
    return { categoria, pratos };
}

export default function PratosPage() {
    const { categoriaId } = useParams();
    const { dados, carregando, erro, recarregar } = useDados(() => carregarCategoriaComPratos(categoriaId), [categoriaId]);
    const exclusao = useExclusao({ excluir: pratoService.excluir, aoExcluir: recarregar });

    return (
        <>
            <CabecalhoPagina
                titulo={dados ? dados.categoria.nome : 'Pratos'}
                subtitulo={dados?.categoria.descricao}
                acoes={
                    <>
                        <Link to={rotas.categorias()} className={botao.secundario}>← Categorias</Link>
                        <Link to={rotas.novoPrato(categoriaId)} className={botao.primario}>+ Novo prato</Link>
                    </>
                }
            />
            <Mensagem tipo="sucesso">{exclusao.sucesso}</Mensagem>
            <Mensagem tipo="erro">{exclusao.erro}</Mensagem>
            <EstadoDaPagina carregando={carregando} erro={erro}>
                <ListaPratos categoriaId={categoriaId} pratos={dados?.pratos ?? []} aoExcluir={exclusao.confirmarExclusao} />
            </EstadoDaPagina>
        </>
    );
}

function ListaPratos({ categoriaId, pratos, aoExcluir }) {
    if (pratos.length === 0) {
        return <p className={`${cartao} p-8 text-center text-sm text-texto-suave`}>Nenhum prato cadastrado nesta categoria.</p>;
    }

    return (
        <ul className="grid gap-3">
            {pratos.map((prato) => (
                <li key={prato.id} className={`${cartao} flex flex-wrap items-center gap-4 p-3`}>
                    <ImagemPrato url={prato.imagem_url} nome={prato.nome} className="size-20 shrink-0 rounded-xl" />
                    <div className="min-w-40 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-display text-base font-extrabold uppercase text-texto">{prato.nome}</h2>
                            <SeloDisponibilidade disponivel={prato.disponivel} />
                            {prato.destaque && <SeloDestaque />}
                        </div>
                        {prato.descricao && <p className="text-sm text-texto-suave">{prato.descricao}</p>}
                        <p className="mt-1 font-display text-lg font-bold text-destaque">{formatarPreco(prato.preco)}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link to={rotas.editarPrato(categoriaId, prato.id)} className={botao.secundario}>Editar</Link>
                        <button type="button" className={botao.perigo} onClick={() => aoExcluir(prato.id, prato.nome)}>
                            Excluir
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

function SeloDisponibilidade({ disponivel }) {
    const estilo = disponivel ? 'bg-sucesso/15 text-sucesso' : 'bg-superficie-alta text-texto-suave';
    return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${estilo}`}>
            {disponivel ? 'Disponível' : 'Esgotado'}
        </span>
    );
}
