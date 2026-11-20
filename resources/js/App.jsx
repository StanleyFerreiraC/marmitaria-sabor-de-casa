import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CardapioPage from './pages/CardapioPage';
import CategoriaFormPage from './pages/CategoriaFormPage';
import CategoriasPage from './pages/CategoriasPage';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada';
import PratoFormPage from './pages/PratoFormPage';
import PratosPage from './pages/PratosPage';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="/categorias" replace />} />
                <Route path="categorias" element={<CategoriasPage />} />
                <Route path="categorias/nova" element={<CategoriaFormPage />} />
                <Route path="categorias/:categoriaId/editar" element={<CategoriaFormPage />} />
                <Route path="categorias/:categoriaId/pratos" element={<PratosPage />} />
                <Route path="categorias/:categoriaId/pratos/novo" element={<PratoFormPage />} />
                <Route path="categorias/:categoriaId/pratos/:pratoId/editar" element={<PratoFormPage />} />
                <Route path="cardapio" element={<CardapioPage />} />
                <Route path="*" element={<PaginaNaoEncontrada />} />
            </Route>
        </Routes>
    );
}
