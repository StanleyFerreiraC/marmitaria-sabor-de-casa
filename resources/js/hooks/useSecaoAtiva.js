import { useEffect, useState } from 'react';

/**
 * Descobre qual seção está visível logo abaixo do cabeçalho fixo, para destacar a aba correspondente.
 * Retorna null enquanto a página está antes da primeira seção.
 */
export function useSecaoAtiva(idsDasSecoes, alturaCabecalho) {
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    useEffect(() => {
        let quadroPendente = null;

        function chegouAoFim() {
            return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        }

        function atualizar() {
            quadroPendente = null;
            if (window.scrollY > 0 && chegouAoFim()) {
                // A última seção pode ser curta demais para alcançar o topo: no fim da página, ela é a ativa.
                setSecaoAtiva(idsDasSecoes.at(-1) ?? null);
                return;
            }
            const limite = alturaCabecalho + 24;
            const visivel = idsDasSecoes.filter((id) => document.getElementById(id)?.getBoundingClientRect().top <= limite).at(-1);
            setSecaoAtiva(visivel ?? null);
        }

        function aoRolar() {
            quadroPendente ??= requestAnimationFrame(atualizar);
        }

        atualizar();
        window.addEventListener('scroll', aoRolar, { passive: true });
        return () => {
            window.removeEventListener('scroll', aoRolar);
            if (quadroPendente) cancelAnimationFrame(quadroPendente);
        };
    }, [idsDasSecoes, alturaCabecalho]);

    return secaoAtiva;
}
