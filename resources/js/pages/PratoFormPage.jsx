import { useNavigate, useParams } from 'react-router-dom';
import BotoesFormulario from '../components/BotoesFormulario';
import CabecalhoPagina from '../components/CabecalhoPagina';
import CampoFormulario from '../components/CampoFormulario';
import EstadoDaPagina from '../components/EstadoDaPagina';
import Mensagem from '../components/Mensagem';
import { useDados } from '../hooks/useDados';
import { useFormulario } from '../hooks/useFormulario';
import { categoriaService } from '../services/categoriaService';
import { pratoService } from '../services/pratoService';
import { cartao } from '../utils/estilos';
import { validarPrato } from '../utils/validacoes';

async function carregarDadosDoFormulario(categoriaId, pratoId) {
    const [categoria, prato] = await Promise.all([
        categoriaService.buscar(categoriaId),
        pratoId ? pratoService.buscar(pratoId) : null,
    ]);
    return { categoria, prato };
}

/**
 * Cadastro e edição de prato dentro de uma categoria.
 */
export default function PratoFormPage() {
    const { categoriaId, pratoId } = useParams();
    const { dados, carregando, erro } = useDados(() => carregarDadosDoFormulario(categoriaId, pratoId), [categoriaId, pratoId]);

    return (
        <>
            <CabecalhoPagina
                titulo={pratoId ? 'Editar prato' : 'Novo prato'}
                subtitulo={dados && `Categoria: ${dados.categoria.nome}`}
            />
            <EstadoDaPagina carregando={carregando} erro={erro}>
                <FormularioPrato key={pratoId ?? 'novo'} categoriaId={categoriaId} prato={dados?.prato} />
            </EstadoDaPagina>
        </>
    );
}

function valoresIniciais(prato) {
    return {
        nome: prato?.nome ?? '',
        descricao: prato?.descricao ?? '',
        preco: prato ? String(prato.preco) : '',
        disponivel: prato?.disponivel ?? true,
    };
}

function FormularioPrato({ categoriaId, prato }) {
    const navigate = useNavigate();
    const voltarPara = `/categorias/${categoriaId}/pratos`;
    const formulario = useFormulario({
        valoresIniciais: valoresIniciais(prato),
        validar: validarPrato,
        enviar: async (valores) => {
            const dados = { ...valores, preco: Number(valores.preco), descricao: valores.descricao || null };
            if (prato) {
                await pratoService.atualizar(prato.id, dados);
            } else {
                await pratoService.criar(categoriaId, dados);
            }
            navigate(voltarPara, { state: { sucesso: `Prato "${valores.nome}" salvo com sucesso.` } });
        },
    });

    return (
        <form noValidate onSubmit={formulario.aoEnviar} className={`${cartao} max-w-xl p-6`}>
            <Mensagem tipo="erro">{formulario.erroGeral}</Mensagem>
            <CampoFormulario
                rotulo="Nome"
                nome="nome"
                obrigatorio
                maxLength={100}
                value={formulario.valores.nome}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.nome}
            />
            <CampoFormulario
                rotulo="Descrição"
                nome="descricao"
                multilinha
                rows={2}
                maxLength={255}
                value={formulario.valores.descricao}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.descricao}
            />
            <CampoFormulario
                rotulo="Preço (R$)"
                nome="preco"
                type="number"
                step="0.01"
                min="0.01"
                inputMode="decimal"
                obrigatorio
                value={formulario.valores.preco}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.preco}
            />
            <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                    type="checkbox"
                    name="disponivel"
                    checked={formulario.valores.disponivel}
                    onChange={formulario.alterarCampo}
                    className="size-4 accent-orange-600"
                />
                Disponível hoje (desmarque quando o prato acabar)
            </label>
            <BotoesFormulario enviando={formulario.enviando} voltarPara={voltarPara} />
        </form>
    );
}
