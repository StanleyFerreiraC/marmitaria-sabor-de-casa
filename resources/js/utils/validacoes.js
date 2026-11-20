/**
 * Validações feitas no navegador para dar retorno imediato.
 * O serviço web repete as regras (e também checa nome repetido), então ele continua sendo a fonte da verdade.
 */
function estaVazio(valor) {
    return String(valor ?? '').trim() === '';
}

function ehEnderecoHttps(valor) {
    try {
        return new URL(valor).protocol === 'https:';
    } catch {
        return false;
    }
}

export function validarCategoria({ nome }) {
    const erros = {};
    if (estaVazio(nome)) {
        erros.nome = 'O nome da categoria é obrigatório.';
    }
    return erros;
}

export function validarPrato({ nome, preco, imagem_url: imagemUrl }) {
    const erros = {};
    if (estaVazio(nome)) {
        erros.nome = 'O nome do prato é obrigatório.';
    }
    if (estaVazio(preco)) {
        erros.preco = 'O preço é obrigatório.';
    } else if (!(Number(preco) > 0)) {
        erros.preco = 'O preço deve ser maior que zero.';
    }
    if (!estaVazio(imagemUrl) && !ehEnderecoHttps(imagemUrl)) {
        erros.imagem_url = 'Informe um endereço de imagem válido, começando com https://.';
    }
    return erros;
}

export function validarLogin({ email, senha }) {
    const erros = {};
    if (estaVazio(email)) {
        erros.email = 'Informe o e-mail.';
    }
    if (estaVazio(senha)) {
        erros.senha = 'Informe a senha.';
    }
    return erros;
}
