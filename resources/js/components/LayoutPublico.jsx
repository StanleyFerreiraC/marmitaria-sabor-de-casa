import { Link, Outlet } from 'react-router-dom';
import { rotas } from '../utils/rotas';

export default function LayoutPublico() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t border-creme-escuro bg-cafe text-sm text-white/70">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6">
                    <p>
                        <span className="font-display font-semibold text-white">Sabor de Casa</span> · comida caseira feita todo dia.
                        Fotos ilustrativas: Unsplash.
                    </p>
                    <Link to={rotas.categorias()} className="font-semibold text-acafrao hover:text-white">
                        Área do gerente
                    </Link>
                </div>
            </footer>
        </div>
    );
}
