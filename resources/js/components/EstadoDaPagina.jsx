import Mensagem from './Mensagem';

/**
 * Mostra "carregando" ou o erro de carregamento; com os dados prontos, mostra o conteúdo.
 */
export default function EstadoDaPagina({ carregando, erro, children }) {
    if (carregando) {
        return <p className="py-10 text-center text-sm text-texto-suave">Carregando...</p>;
    }
    if (erro) {
        return <Mensagem tipo="erro">{erro}</Mensagem>;
    }
    return children;
}
