const ESTILO_POR_TIPO = {
    sucesso: 'border-folha/30 bg-folha-claro text-folha',
    erro: 'border-barro/30 bg-barro/10 text-barro-escuro',
};

export default function Mensagem({ tipo, children }) {
    if (!children) {
        return null;
    }

    return (
        <div role={tipo === 'erro' ? 'alert' : 'status'} className={`mb-4 rounded-xl border px-4 py-3 text-sm font-medium ${ESTILO_POR_TIPO[tipo]}`}>
            {children}
        </div>
    );
}
