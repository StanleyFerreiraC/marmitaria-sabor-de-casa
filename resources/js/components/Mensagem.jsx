const ESTILO_POR_TIPO = {
    sucesso: 'border-green-200 bg-green-50 text-green-800',
    erro: 'border-red-200 bg-red-50 text-red-800',
};

export default function Mensagem({ tipo, children }) {
    if (!children) {
        return null;
    }

    return (
        <div role={tipo === 'erro' ? 'alert' : 'status'} className={`mb-4 rounded-lg border px-4 py-3 text-sm ${ESTILO_POR_TIPO[tipo]}`}>
            {children}
        </div>
    );
}
