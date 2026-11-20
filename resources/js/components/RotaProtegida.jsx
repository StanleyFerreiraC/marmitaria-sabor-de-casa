import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAutenticacao } from '../contexts/AutenticacaoContext';
import { rotas } from '../utils/rotas';

/**
 * Só deixa entrar na área administrativa quem está logado; os demais vão para o login.
 */
export default function RotaProtegida() {
    const { usuario, verificando } = useAutenticacao();
    const location = useLocation();

    if (verificando) {
        return <p className="py-20 text-center text-sm text-texto-suave">Verificando acesso...</p>;
    }
    if (!usuario) {
        return <Navigate to={rotas.login()} replace state={{ voltarPara: location.pathname }} />;
    }
    return <Outlet />;
}
