import { Link } from 'react-router-dom';
import { botao } from '../utils/estilos';

export default function PaginaNaoEncontrada() {
    return (
        <div className="py-16 text-center">
            <h1 className="text-2xl font-semibold">Página não encontrada</h1>
            <p className="mt-2 text-stone-500">O endereço acessado não existe.</p>
            <Link to="/categorias" className={`${botao.primario} mt-6`}>Ir para categorias</Link>
        </div>
    );
}
