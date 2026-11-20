import { Link } from 'react-router-dom';
import { botao, tituloDisplay } from '../utils/estilos';
import { rotas } from '../utils/rotas';

export default function PaginaNaoEncontrada() {
    return (
        <div className="px-4 py-24 text-center">
            <p className="font-display text-6xl font-bold text-barro">404</p>
            <h1 className={`mt-2 text-2xl ${tituloDisplay}`}>Essa página saiu do forno e sumiu</h1>
            <p className="mt-2 text-cafe-claro">O endereço acessado não existe.</p>
            <Link to={rotas.cardapio()} className={`${botao.primario} mt-6`}>Ver o cardápio</Link>
        </div>
    );
}
