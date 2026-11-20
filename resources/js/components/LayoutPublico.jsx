import { Link, Outlet } from 'react-router-dom';
import { rotas } from '../utils/rotas';

export default function LayoutPublico() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t border-borda text-sm text-texto-suave">
                <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-6">
                    <p>
                        <span className="font-display font-extrabold text-texto">Sabor de Casa</span> · comida caseira feita todo dia. Fotos
                        ilustrativas: Unsplash.
                    </p>
                    <Link to={rotas.categorias()} className="font-semibold text-destaque hover:text-destaque-forte">
                        Área do gerente
                    </Link>
                </div>
            </footer>
        </div>
    );
}
