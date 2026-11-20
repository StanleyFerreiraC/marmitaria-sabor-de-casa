import { useNavigate, useParams } from 'react-router-dom';
import BotoesFormulario from '../components/BotoesFormulario';
import CabecalhoPagina from '../components/CabecalhoPagina';
import CampoFormulario from '../components/CampoFormulario';
import EstadoDaPagina from '../components/EstadoDaPagina';
import ImagemPrato from '../components/ImagemPrato';
import Mensagem from '../components/Mensagem';
import { useDados } from '../hooks/useDados';
import { useFormulario } from '../hooks/useFormulario';
import { categoriaService } from '../services/categoriaService';
import { pratoService } from '../services/pratoService';
import { cartao } from '../utils/estilos';
import { rotas } from '../utils/rotas';
import { validarPrato } from '../utils/validacoes';

async function carregarDadosDoFormulario(categoriaId, pratoId) {
    const [categorias, prato] = await Promise.all([
        categoriaService.listar(),
        pratoId ? pratoService.buscar(pratoId) : null,
    ]);
    return { categorias, prato };
}

/**
 * Cadastro e edição de prato. Na edição, o prato pode ser movido para outra categoria.
 */
export default function PratoFormPage() {
    const { categoriaId, pratoId } = useParams();
    const { dados, carregando, erro } = useDados(() => carregarDadosDoFormulario(categoriaId, pratoId), [categoriaId, pratoId]);
    const categoriaAtual = dados?.categorias.find((categoria) => String(categoria.id) === categoriaId);

    return (
        <>
            <CabecalhoPagina
                titulo={pratoId ? 'Editar prato' : 'Novo prato'}
                subtitulo={categoriaAtual && `Categoria: ${categoriaAtual.nome}`}
            />
            <EstadoDaPagina carregando={carregando} erro={erro}>
                <FormularioPrato key={pratoId ?? 'novo'} categoriaId={categoriaId} categorias={dados?.categorias ?? []} prato={dados?.prato} />
            </EstadoDaPagina>
        </>
    );
}

function valoresIniciais(prato, categoriaId) {
    return {
        categoria_id: String(prato?.categoria_id ?? categoriaId),
        nome: prato?.nome ?? '',
        descricao: prato?.descricao ?? '',
        imagem_url: prato?.imagem_url ?? '',
        preco: prato ? String(prato.preco) : '',
        disponivel: prato?.disponivel ?? true,
        destaque: prato?.destaque ?? false,
    };
}

function montarDadosParaEnvio(valores) {
    return {
        ...valores,
        categoria_id: Number(valores.categoria_id),
        preco: Number(valores.preco),
        descricao: valores.descricao || null,
        imagem_url: valores.imagem_url || null,
    };
}

function CaixaDeSelecao({ nome, marcada, aoMudar, children }) {
    return (
        <label className="mb-2 flex items-center gap-2 text-sm text-texto">
            <input type="checkbox" name={nome} checked={marcada} onChange={aoMudar} className="size-4 accent-destaque" />
            {children}
        </label>
    );
}

function FormularioPrato({ categoriaId, categorias, prato }) {
    const navigate = useNavigate();
    const formulario = useFormulario({
        valoresIniciais: valoresIniciais(prato, categoriaId),
        validar: validarPrato,
        enviar: async (valores) => {
            const dados = montarDadosParaEnvio(valores);
            if (prato) {
                await pratoService.atualizar(prato.id, dados);
            } else {
                await pratoService.criar(categoriaId, dados);
            }
            navigate(rotas.pratos(dados.categoria_id), { state: { sucesso: `Prato "${valores.nome}" salvo com sucesso.` } });
        },
    });
    const { valores, erros, alterarCampo } = formulario;

    return (
        <form noValidate onSubmit={formulario.aoEnviar} className={`${cartao} grid max-w-3xl gap-x-8 p-6 md:grid-cols-[1fr_220px]`}>
            <div>
                <Mensagem tipo="erro">{formulario.erroGeral}</Mensagem>
                <CampoFormulario rotulo="Nome" nome="nome" obrigatorio maxLength={100} value={valores.nome} onChange={alterarCampo} erro={erros.nome} />
                <CampoFormulario rotulo="Descrição" nome="descricao" multilinha rows={2} maxLength={255} value={valores.descricao} onChange={alterarCampo} erro={erros.descricao} />
                <CampoFormulario
                    rotulo="Preço (R$)"
                    nome="preco"
                    type="number"
                    step="0.01"
                    min="0.01"
                    inputMode="decimal"
                    obrigatorio
                    value={valores.preco}
                    onChange={alterarCampo}
                    erro={erros.preco}
                />
                {prato && (
                    <CampoFormulario
                        rotulo="Categoria"
                        nome="categoria_id"
                        value={valores.categoria_id}
                        onChange={alterarCampo}
                        erro={erros.categoria_id}
                        opcoes={categorias.map((categoria) => ({ valor: String(categoria.id), rotulo: categoria.nome }))}
                        ajuda="Troque para mover o prato para outra categoria."
                    />
                )}
                <CampoFormulario
                    rotulo="Foto (endereço da imagem)"
                    nome="imagem_url"
                    type="url"
                    placeholder="https://..."
                    maxLength={500}
                    value={valores.imagem_url}
                    onChange={alterarCampo}
                    erro={erros.imagem_url}
                    ajuda="Cole o link de uma imagem que comece com https://."
                />
                <CaixaDeSelecao nome="disponivel" marcada={valores.disponivel} aoMudar={alterarCampo}>
                    Disponível hoje (desmarque quando o prato acabar)
                </CaixaDeSelecao>
                <CaixaDeSelecao nome="destaque" marcada={valores.destaque} aoMudar={alterarCampo}>
                    Destaque da casa (aparece no carrossel do cardápio)
                </CaixaDeSelecao>
                <BotoesFormulario enviando={formulario.enviando} voltarPara={rotas.pratos(categoriaId)} />
            </div>
            <div className="mt-6 md:mt-0">
                <p className="mb-1 text-sm font-semibold text-texto">Pré-visualização</p>
                <ImagemPrato key={valores.imagem_url} url={valores.imagem_url} nome={valores.nome || 'Prato'} className="aspect-[4/3] w-full rounded-xl" />
            </div>
        </form>
    );
}
