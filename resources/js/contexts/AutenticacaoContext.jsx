import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { definirAoPerderSessao } from '../services/api';
import { autenticacaoService } from '../services/autenticacaoService';

const AutenticacaoContext = createContext(null);

/**
 * Guarda o gerente logado. Envolve só a área administrativa e o login:
 * o cardápio público não precisa consultar a sessão.
 */
export function AutenticacaoProvider() {
    const [usuario, setUsuario] = useState(null);
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        definirAoPerderSessao(() => setUsuario(null));
        autenticacaoService
            .usuarioAtual()
            .then(setUsuario)
            .catch(() => setUsuario(null))
            .finally(() => setVerificando(false));
    }, []);

    const entrar = useCallback(async (email, senha) => {
        setUsuario(await autenticacaoService.entrar(email, senha));
    }, []);

    const sair = useCallback(async () => {
        await autenticacaoService.sair().catch(() => {});
        setUsuario(null);
    }, []);

    const valor = useMemo(() => ({ usuario, verificando, entrar, sair }), [usuario, verificando, entrar, sair]);

    return (
        <AutenticacaoContext.Provider value={valor}>
            <Outlet />
        </AutenticacaoContext.Provider>
    );
}

export function useAutenticacao() {
    return useContext(AutenticacaoContext);
}
