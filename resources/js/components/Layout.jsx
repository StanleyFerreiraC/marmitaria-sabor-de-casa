import { NavLink, Outlet } from 'react-router-dom';

function linkDoMenu({ isActive }) {
    const base = 'rounded-lg px-3 py-2 text-sm font-medium transition';
    return isActive ? `${base} bg-orange-100 text-orange-800` : `${base} text-stone-600 hover:bg-stone-100`;
}

export default function Layout() {
    return (
        <div className="min-h-screen">
            <header className="border-b border-stone-200 bg-white">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
                    <NavLink to="/categorias" className="text-lg font-semibold text-orange-700">
                        Sabor de Casa
                        <span className="ml-2 text-sm font-normal text-stone-500">cardápio digital</span>
                    </NavLink>
                    <nav className="flex gap-1">
                        <NavLink to="/categorias" className={linkDoMenu}>
                            Categorias
                        </NavLink>
                        <NavLink to="/cardapio" className={linkDoMenu}>
                            Ver cardápio
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
