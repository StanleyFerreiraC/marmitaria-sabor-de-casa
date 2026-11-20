/**
 * Regras de exibição do cardápio público, separadas da tela para ficarem fáceis de ler e testar.
 */
function normalizar(texto) {
    return String(texto ?? '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim();
}

function pratoCorrespondeABusca(prato, termo) {
    return normalizar(prato.nome).includes(termo) || normalizar(prato.descricao).includes(termo);
}

/** Mantém só os pratos que batem com a busca (ignorando acentos) e remove categorias que ficaram vazias. */
export function filtrarPorBusca(categorias, busca) {
    const termo = normalizar(busca);
    if (!termo) {
        return categorias;
    }

    return categorias
        .map((categoria) => ({ ...categoria, pratos: categoria.pratos.filter((prato) => pratoCorrespondeABusca(prato, termo)) }))
        .filter((categoria) => categoria.pratos.length > 0);
}

/** Pratos marcados como destaque da casa, de todas as categorias. */
export function listarDestaques(categorias) {
    return categorias.flatMap((categoria) => categoria.pratos.filter((prato) => prato.destaque));
}
