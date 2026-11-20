import { api } from './api';

export const categoriaService = {
    listar: () => api.get('/categorias'),
    buscar: (id) => api.get(`/categorias/${id}`),
    criar: (dados) => api.post('/categorias', dados),
    atualizar: (id, dados) => api.put(`/categorias/${id}`, dados),
    excluir: (id) => api.delete(`/categorias/${id}`),
};
