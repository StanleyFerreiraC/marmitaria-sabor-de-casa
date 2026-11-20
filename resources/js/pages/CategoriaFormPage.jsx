import { useNavigate, useParams } from 'react-router-dom';
import BotoesFormulario from '../components/BotoesFormulario';
import CabecalhoPagina from '../components/CabecalhoPagina';
import CampoFormulario from '../components/CampoFormulario';
import EstadoDaPagina from '../components/EstadoDaPagina';
import Mensagem from '../components/Mensagem';
import { useDados } from '../hooks/useDados';
import { useFormulario } from '../hooks/useFormulario';
import { categoriaService } from '../services/categoriaService';
import { cartao } from '../utils/estilos';
import { rotas } from '../utils/rotas';
import { validarCategoria } from '../utils/validacoes';

/**
 * Cadastro (/categorias/nova) e edição (/categorias/:categoriaId/editar) de categoria.
 */
export default function CategoriaFormPage() {
    const { categoriaId } = useParams();
    const emEdicao = Boolean(categoriaId);
    const { dados: categoria, carregando, erro } = useDados(
        () => (emEdicao ? categoriaService.buscar(categoriaId) : Promise.resolve(null)),
        [categoriaId],
    );

    return (
        <>
            <CabecalhoPagina titulo={emEdicao ? 'Editar categoria' : 'Nova categoria'} />
            <EstadoDaPagina carregando={carregando} erro={erro}>
                <FormularioCategoria key={categoriaId ?? 'nova'} categoria={categoria} />
            </EstadoDaPagina>
        </>
    );
}

function FormularioCategoria({ categoria }) {
    const navigate = useNavigate();
    const formulario = useFormulario({
        valoresIniciais: { nome: categoria?.nome ?? '', descricao: categoria?.descricao ?? '' },
        validar: validarCategoria,
        enviar: async (valores) => {
            const dados = { nome: valores.nome, descricao: valores.descricao || null };
            if (categoria) {
                await categoriaService.atualizar(categoria.id, dados);
            } else {
                await categoriaService.criar(dados);
            }
            navigate(rotas.categorias(), { state: { sucesso: `Categoria "${valores.nome}" salva com sucesso.` } });
        },
    });

    return (
        <form noValidate onSubmit={formulario.aoEnviar} className={`${cartao} max-w-xl p-6`}>
            <Mensagem tipo="erro">{formulario.erroGeral}</Mensagem>
            <CampoFormulario
                rotulo="Nome"
                nome="nome"
                obrigatorio
                maxLength={80}
                value={formulario.valores.nome}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.nome}
            />
            <CampoFormulario
                rotulo="Descrição"
                nome="descricao"
                multilinha
                rows={3}
                maxLength={255}
                value={formulario.valores.descricao}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.descricao}
            />
            <BotoesFormulario enviando={formulario.enviando} voltarPara={rotas.categorias()} />
        </form>
    );
}
