import { useCallback, useEffect, useState } from 'react';

/**
 * Carrega dados do serviço web controlando os estados de carregamento e erro.
 */
export function useDados(carregar, dependencias) {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const recarregar = useCallback(async () => {
        setCarregando(true);
        setErro('');
        try {
            setDados(await carregar());
        } catch (falha) {
            setErro(falha.message);
        } finally {
            setCarregando(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencias);

    useEffect(() => {
        recarregar();
    }, [recarregar]);

    return { dados, carregando, erro, recarregar };
}
