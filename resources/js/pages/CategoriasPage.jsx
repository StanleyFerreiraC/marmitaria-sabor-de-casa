import { Link } from 'react-router-dom';
import CabecalhoPagina from '../components/CabecalhoPagina';
import EstadoDaPagina from '../components/EstadoDaPagina';
import Mensagem from '../components/Mensagem';
import { useDados } from '../hooks/useDados';
import { useExclusao } from '../hooks/useExclusao';
import { categoriaService } from '../services/categoriaService';
import { botao, cartao } from '../utils/estilos';
import { rotas } from '../utils/rotas';

export default function CategoriasPage() {
    const { dados: categorias, carregando, erro, recarregar } = useDados(categoriaService.listar, []);
    const exclusao = useExclusao({ excluir: categoriaService.excluir, aoExcluir: recarregar });

    return (
        <>
            <CabecalhoPagina
                titulo="Categorias"
                subtitulo="Organize o cardápio em categorias e cadastre os pratos de cada uma."
                acoes={<Link to={rotas.novaCategoria()} className={botao.primario}>+ Nova categoria</Link>}
            />
            <Mensagem tipo="sucesso">{exclusao.sucesso}</Mensagem>
            <Mensagem tipo="erro">{exclusao.erro}</Mensagem>
            <EstadoDaPagina carregando={carregando} erro={erro}>
                <ListaCategorias categorias={categorias ?? []} aoExcluir={exclusao.confirmarExclusao} />
            </EstadoDaPagina>
        </>
    );
}

function ListaCategorias({ categorias, aoExcluir }) {
    if (categorias.length === 0) {
        return <p className={`${cartao} p-8 text-center text-sm text-cafe-claro`}>Nenhuma categoria cadastrada ainda.</p>;
    }

    return (
        <ul className="grid gap-3">
            {categorias.map((categoria) => (
                <li key={categoria.id} className={`${cartao} flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-acafrao p-4`}>
                    <div>
                        <h2 className="font-display text-xl font-semibold text-cafe">{categoria.nome}</h2>
                        {categoria.descricao && <p className="text-sm text-cafe-claro">{categoria.descricao}</p>}
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-barro">
                            {categoria.quantidade_pratos} {categoria.quantidade_pratos === 1 ? 'prato' : 'pratos'}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link to={rotas.pratos(categoria.id)} className={botao.primario}>Ver pratos</Link>
                        <Link to={rotas.editarCategoria(categoria.id)} className={botao.secundario}>Editar</Link>
                        <button type="button" className={botao.perigo} onClick={() => aoExcluir(categoria.id, categoria.nome)}>
                            Excluir
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
