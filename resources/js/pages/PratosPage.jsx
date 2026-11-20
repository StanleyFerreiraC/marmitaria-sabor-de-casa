import { Link, useParams } from 'react-router-dom';
import CabecalhoPagina from '../components/CabecalhoPagina';
import EstadoDaPagina from '../components/EstadoDaPagina';
import Mensagem from '../components/Mensagem';
import { useDados } from '../hooks/useDados';
import { useExclusao } from '../hooks/useExclusao';
import { categoriaService } from '../services/categoriaService';
import { pratoService } from '../services/pratoService';
import { botao, cartao } from '../utils/estilos';
import { formatarPreco } from '../utils/formatarPreco';

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
                titulo={dados ? `Pratos · ${dados.categoria.nome}` : 'Pratos'}
                subtitulo={dados?.categoria.descricao}
                acoes={
                    <>
                        <Link to="/categorias" className={botao.secundario}>Voltar</Link>
                        <Link to={`/categorias/${categoriaId}/pratos/novo`} className={botao.primario}>Novo prato</Link>
                    </>
                }
            />
            <Mensagem tipo="sucesso">{exclusao.sucesso}</Mensagem>
            <Mensagem tipo="erro">{exclusao.erro}</Mensagem>
            <EstadoDaPagina carregando={carregando} erro={erro}>
                <TabelaPratos categoriaId={categoriaId} pratos={dados?.pratos ?? []} aoExcluir={exclusao.confirmarExclusao} />
            </EstadoDaPagina>
        </>
    );
}

function TabelaPratos({ categoriaId, pratos, aoExcluir }) {
    if (pratos.length === 0) {
        return <p className={`${cartao} p-8 text-center text-sm text-stone-500`}>Nenhum prato cadastrado nesta categoria.</p>;
    }

    return (
        <div className={`${cartao} overflow-x-auto`}>
            <table className="w-full text-left text-sm">
                <thead className="border-b border-stone-200 text-xs uppercase text-stone-500">
                    <tr>
                        <th className="px-4 py-3">Prato</th>
                        <th className="px-4 py-3">Preço</th>
                        <th className="px-4 py-3">Situação</th>
                        <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {pratos.map((prato) => (
                        <tr key={prato.id}>
                            <td className="px-4 py-3">
                                <p className="font-medium text-stone-900">{prato.nome}</p>
                                {prato.descricao && <p className="text-stone-500">{prato.descricao}</p>}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">{formatarPreco(prato.preco)}</td>
                            <td className="px-4 py-3"><SeloDisponibilidade disponivel={prato.disponivel} /></td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                    <Link to={`/categorias/${categoriaId}/pratos/${prato.id}/editar`} className={botao.secundario}>
                                        Editar
                                    </Link>
                                    <button type="button" className={botao.perigo} onClick={() => aoExcluir(prato.id, prato.nome)}>
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SeloDisponibilidade({ disponivel }) {
    const estilo = disponivel ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600';
    return (
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${estilo}`}>
            {disponivel ? 'Disponível' : 'Esgotado'}
        </span>
    );
}
