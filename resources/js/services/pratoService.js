import { api } from './api';

export const pratoService = {
    listarPorCategoria: (categoriaId) => api.get(`/categorias/${categoriaId}/pratos`),
    buscar: (id) => api.get(`/pratos/${id}`),
    criar: (categoriaId, dados) => api.post(`/categorias/${categoriaId}/pratos`, dados),
    atualizar: (id, dados) => api.put(`/pratos/${id}`, dados),
    excluir: (id) => api.delete(`/pratos/${id}`),
};

export const cardapioService = {
    buscar: () => api.get('/cardapio'),
};
