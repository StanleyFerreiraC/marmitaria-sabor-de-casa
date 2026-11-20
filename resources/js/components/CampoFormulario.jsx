import { campoEntrada } from '../utils/estilos';

/**
 * Rótulo + campo + mensagem de erro. Use multilinha para um textarea.
 */
export default function CampoFormulario({ rotulo, nome, erro, multilinha = false, obrigatorio = false, ...propriedades }) {
    const Elemento = multilinha ? 'textarea' : 'input';
    const idErro = `${nome}-erro`;
    const borda = erro ? 'border-red-400' : 'border-stone-300';

    return (
        <div className="mb-4">
            <label htmlFor={nome} className="mb-1 block text-sm font-medium text-stone-700">
                {rotulo}
                {obrigatorio && <span className="text-red-600"> *</span>}
            </label>
            <Elemento
                id={nome}
                name={nome}
                aria-invalid={Boolean(erro)}
                aria-describedby={erro ? idErro : undefined}
                className={`${campoEntrada} ${borda}`}
                {...propriedades}
            />
            {erro && (
                <p id={idErro} className="mt-1 text-sm text-red-700">
                    {erro}
                </p>
            )}
        </div>
    );
}
