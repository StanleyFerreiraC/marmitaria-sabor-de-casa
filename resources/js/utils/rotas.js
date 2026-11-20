/**
 * Endereços das telas, num lugar só, para não espalhar strings de rota pelos componentes.
 */
export const rotas = {
    cardapio: () => '/',
    login: () => '/login',
    categorias: () => '/admin/categorias',
    novaCategoria: () => '/admin/categorias/nova',
    editarCategoria: (categoriaId) => `/admin/categorias/${categoriaId}/editar`,
    pratos: (categoriaId) => `/admin/categorias/${categoriaId}/pratos`,
    novoPrato: (categoriaId) => `/admin/categorias/${categoriaId}/pratos/novo`,
    editarPrato: (categoriaId, pratoId) => `/admin/categorias/${categoriaId}/pratos/${pratoId}/editar`,
};

// Foto do Unsplash (licença gratuita) usada na tela de login.
export const fotos = {
    login: 'https://images.unsplash.com/photo-1628521061262-19b5cdb7eee5?w=1200&q=75&auto=format&fit=crop',
};
