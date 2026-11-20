const ESTILO_POR_TIPO = {
    sucesso: 'border-sucesso/30 bg-sucesso/10 text-sucesso',
    erro: 'border-perigo/40 bg-perigo/10 text-perigo',
};

export default function Mensagem({ tipo, children }) {
    if (!children) {
        return null;
    }

    return (
        <div role={tipo === 'erro' ? 'alert' : 'status'} className={`mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${ESTILO_POR_TIPO[tipo]}`}>
            {children}
        </div>
    );
}
