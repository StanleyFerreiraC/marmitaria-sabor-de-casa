/**
 * Validações feitas no navegador para dar retorno imediato.
 * O serviço web repete as regras (e também checa nome repetido), então ele continua sendo a fonte da verdade.
 */
function estaVazio(valor) {
    return String(valor ?? '').trim() === '';
}

export function validarCategoria({ nome }) {
    const erros = {};
    if (estaVazio(nome)) {
        erros.nome = 'O nome da categoria é obrigatório.';
    }
    return erros;
}

export function validarPrato({ nome, preco }) {
    const erros = {};
    if (estaVazio(nome)) {
        erros.nome = 'O nome do prato é obrigatório.';
    }
    if (estaVazio(preco)) {
        erros.preco = 'O preço é obrigatório.';
    } else if (!(Number(preco) > 0)) {
        erros.preco = 'O preço deve ser maior que zero.';
    }
    return erros;
}
