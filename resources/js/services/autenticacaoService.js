import { api } from './api';

export const autenticacaoService = {
    entrar: (email, senha) => api.post('/login', { email, senha }),
    sair: () => api.post('/logout'),
    usuarioAtual: () => api.get('/usuario'),
};
