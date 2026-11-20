import { useLayoutEffect, useState } from 'react';

/**
 * Altura atual de um elemento (atualizada quando ele muda de tamanho).
 */
export function useAltura(ref) {
    const [altura, setAltura] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) {
            return undefined;
        }
        const observador = new ResizeObserver(([entrada]) => setAltura(entrada.target.offsetHeight));
        observador.observe(ref.current);
        return () => observador.disconnect();
    }, [ref]);

    return altura;
}
