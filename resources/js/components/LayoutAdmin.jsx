import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAutenticacao } from '../contexts/AutenticacaoContext';
import { rotas } from '../utils/rotas';
import Marca from './Marca';

function linkDoMenu({ isActive }) {
    const base = 'rounded-full px-3 py-1.5 text-sm font-semibold transition';
    return isActive ? `${base} bg-barro text-white` : `${base} text-cafe-claro hover:bg-creme-escuro`;
}

export default function LayoutAdmin() {
    const { usuario, sair } = useAutenticacao();
    const navigate = useNavigate();

    async function aoSair() {
        await sair();
        navigate(rotas.login(), { replace: true });
    }

    return (
        <div className="min-h-screen">
            <header className="border-b border-creme-escuro bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
                    <Link to={rotas.categorias()}>
                        <Marca subtitulo="Painel do gerente" />
                    </Link>
                    <nav className="flex flex-wrap items-center gap-1">
                        <NavLink to={rotas.categorias()} className={linkDoMenu}>
                            Categorias
                        </NavLink>
                        <a href={rotas.cardapio()} target="_blank" rel="noreferrer" className={linkDoMenu({ isActive: false })}>
                            Ver cardápio
                        </a>
                        <span className="mx-2 hidden h-5 w-px bg-creme-escuro sm:block" />
                        <span className="hidden text-sm text-cafe-claro sm:inline">{usuario?.nome}</span>
                        <button type="button" onClick={aoSair} className={linkDoMenu({ isActive: false })}>
                            Sair
                        </button>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
