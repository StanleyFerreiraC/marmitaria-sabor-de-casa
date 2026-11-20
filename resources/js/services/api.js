/**
 * Cliente HTTP único da aplicação: toda chamada ao serviço web passa por aqui.
 * A autenticação usa o cookie de sessão do Laravel Sanctum; requisições que alteram dados
 * enviam o token CSRF lido do cookie XSRF-TOKEN.
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
const MENSAGEM_SESSAO_EXPIRADA = 'Sua sessão expirou. Entre novamente.';

let aoPerderSessao = () => {};

/** Define o que fazer quando o servidor responde que o gerente não está mais logado. */
export function definirAoPerderSessao(funcao) {
    aoPerderSessao = funcao;
}

function lerCookie(nome) {
    const encontrado = document.cookie.match(new RegExp(`(?:^|; )${nome}=([^;]*)`));
    return encontrado ? decodeURIComponent(encontrado[1]) : null;
}

async function cabecalhoCsrf() {
    if (!lerCookie('XSRF-TOKEN')) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' });
    }
    return { 'X-XSRF-TOKEN': lerCookie('XSRF-TOKEN') ?? '' };
}

async function requisitar(metodo, caminho, corpo) {
    const alteraDados = metodo !== 'GET';
    let resposta;
    try {
        resposta = await fetch(`/api${caminho}`, {
            method: metodo,
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(alteraDados ? await cabecalhoCsrf() : {}),
            },
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
    if (status === 401 || status === 419) {
        aoPerderSessao();
        return new ErroApi(status === 419 ? MENSAGEM_SESSAO_EXPIRADA : conteudo.message, status);
    }
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
