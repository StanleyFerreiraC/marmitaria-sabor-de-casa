import { useEffect, useState } from 'react';

const DISTANCIA_PARA_APARECER = 600;

export default function BotaoVoltarTopo() {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const aoRolar = () => setVisivel(window.scrollY > DISTANCIA_PARA_APARECER);
        window.addEventListener('scroll', aoRolar, { passive: true });
        return () => window.removeEventListener('scroll', aoRolar);
    }, []);

    if (!visivel) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            className="fixed right-4 bottom-6 z-30 grid size-12 place-items-center rounded-full border border-borda bg-superficie-alta text-destaque shadow-xl hover:border-destaque"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
        </button>
    );
}
