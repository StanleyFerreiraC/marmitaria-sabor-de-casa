/**
 * Cliente HTTP único da aplicação: toda chamada ao serviço web passa por aqui.
 */
export class ErroApi extends Error {
    constructor(mensagem, status, errosDeCampo = {}) {
        super(mensagem);
        this.status = status;
        this.errosDeCampo = errosDeCampo;
    }
}

const MENSAGEM_SEM_CONEXAO = 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
const MENSAGEM_VALIDACAO = 'Corrija os campos destacados.';
const MENSAGEM_ERRO_SERVIDOR = 'Erro no servidor. Tente novamente em instantes.';

async function requisitar(metodo, caminho, corpo) {
    let resposta;
    try {
        resposta = await fetch(`/api${caminho}`, {
            method: metodo,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: corpo === undefined ? undefined : JSON.stringify(corpo),
        });
    } catch {
        throw new ErroApi(MENSAGEM_SEM_CONEXAO, 0);
    }

    if (resposta.status === 204) {
        return null;
    }

    const conteudo = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
        throw criarErro(resposta.status, conteudo);
    }

    return conteudo.data;
}

function criarErro(status, conteudo) {
    if (status === 422) {
        return new ErroApi(MENSAGEM_VALIDACAO, status, primeiraMensagemPorCampo(conteudo.errors));
    }
    if (status >= 500) {
        return new ErroApi(MENSAGEM_ERRO_SERVIDOR, status);
    }
    return new ErroApi(conteudo.message ?? MENSAGEM_ERRO_SERVIDOR, status);
}

function primeiraMensagemPorCampo(erros = {}) {
    return Object.fromEntries(Object.entries(erros).map(([campo, mensagens]) => [campo, mensagens[0]]));
}

export const api = {
    get: (caminho) => requisitar('GET', caminho),
    post: (caminho, corpo) => requisitar('POST', caminho, corpo),
    put: (caminho, corpo) => requisitar('PUT', caminho, corpo),
    delete: (caminho) => requisitar('DELETE', caminho),
};
