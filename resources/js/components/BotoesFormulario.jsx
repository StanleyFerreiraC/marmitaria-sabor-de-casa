import { Link } from 'react-router-dom';
import { botao } from '../utils/estilos';

export default function BotoesFormulario({ enviando, voltarPara }) {
    return (
        <div className="mt-6 flex gap-2">
            <button type="submit" disabled={enviando} className={botao.primario}>
                {enviando ? 'Salvando...' : 'Salvar'}
            </button>
            <Link to={voltarPara} className={botao.secundario}>
                Cancelar
            </Link>
        </div>
    );
}
