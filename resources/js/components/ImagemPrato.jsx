import { useState } from 'react';

/**
 * Foto do prato com alternativa quando não há imagem ou ela não carrega.
 */
export default function ImagemPrato({ url, nome, className = '' }) {
    const [falhou, setFalhou] = useState(false);

    if (!url || falhou) {
        return (
            <div
                role="img"
                aria-label={`Sem foto de ${nome}`}
                className={`grid place-items-center bg-acafrao-claro font-display text-3xl font-bold text-barro/60 ${className}`}
            >
                {nome?.charAt(0)?.toUpperCase()}
            </div>
        );
    }

    return <img src={url} alt={nome} loading="lazy" onError={() => setFalhou(true)} className={`object-cover ${className}`} />;
}
