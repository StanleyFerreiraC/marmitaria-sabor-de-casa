import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './components/LayoutAdmin';
import LayoutPublico from './components/LayoutPublico';
import RotaProtegida from './components/RotaProtegida';
import { AutenticacaoProvider } from './contexts/AutenticacaoContext';
import CardapioPage from './pages/CardapioPage';
import CategoriaFormPage from './pages/CategoriaFormPage';
import CategoriasPage from './pages/CategoriasPage';
import LoginPage from './pages/LoginPage';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada';
import PratoFormPage from './pages/PratoFormPage';
import PratosPage from './pages/PratosPage';

export default function App() {
    return (
        <Routes>
            {/* Área pública */}
            <Route element={<LayoutPublico />}>
                <Route index element={<CardapioPage />} />
                <Route path="cardapio" element={<Navigate to="/" replace />} />
                <Route path="*" element={<PaginaNaoEncontrada />} />
            </Route>

            {/* Login e área do gerente */}
            <Route element={<AutenticacaoProvider />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="admin" element={<RotaProtegida />}>
                    <Route element={<LayoutAdmin />}>
                        <Route index element={<Navigate to="categorias" replace />} />
                        <Route path="categorias" element={<CategoriasPage />} />
                        <Route path="categorias/nova" element={<CategoriaFormPage />} />
                        <Route path="categorias/:categoriaId/editar" element={<CategoriaFormPage />} />
                        <Route path="categorias/:categoriaId/pratos" element={<PratosPage />} />
                        <Route path="categorias/:categoriaId/pratos/novo" element={<PratoFormPage />} />
                        <Route path="categorias/:categoriaId/pratos/:pratoId/editar" element={<PratoFormPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
