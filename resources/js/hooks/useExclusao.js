import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Confirmação e exclusão de registros nas listas, com as mensagens de sucesso e erro.
 * A mensagem de sucesso inicial pode vir da tela de cadastro, via estado da navegação.
 */
export function useExclusao({ excluir, aoExcluir }) {
    const location = useLocation();
    const [sucesso, setSucesso] = useState(location.state?.sucesso ?? '');
    const [erro, setErro] = useState('');

    async function confirmarExclusao(id, nome) {
        if (!window.confirm(`Excluir "${nome}"? Essa ação não pode ser desfeita.`)) {
            return;
        }

        setSucesso('');
        setErro('');
        try {
            await excluir(id);
            setSucesso(`"${nome}" foi excluído com sucesso.`);
            aoExcluir();
        } catch (falha) {
            setErro(falha.message);
        }
    }

    return { sucesso, erro, confirmarExclusao };
}
