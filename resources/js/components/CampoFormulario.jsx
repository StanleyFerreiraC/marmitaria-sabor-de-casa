import { campoEntrada } from '../utils/estilos';

/**
 * Rótulo + campo + mensagem de erro. Use multilinha para um textarea e opcoes para um select.
 */
export default function CampoFormulario({ rotulo, nome, erro, ajuda, multilinha = false, opcoes, obrigatorio = false, ...propriedades }) {
    const Elemento = opcoes ? 'select' : multilinha ? 'textarea' : 'input';
    const idErro = `${nome}-erro`;
    const borda = erro ? 'border-barro' : 'border-creme-escuro';

    return (
        <div className="mb-4">
            <label htmlFor={nome} className="mb-1 block text-sm font-semibold text-cafe">
                {rotulo}
                {obrigatorio && <span className="text-barro"> *</span>}
            </label>
            <Elemento
                id={nome}
                name={nome}
                aria-invalid={Boolean(erro)}
                aria-describedby={erro ? idErro : undefined}
                className={`${campoEntrada} ${borda}`}
                {...propriedades}
            >
                {opcoes?.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                        {opcao.rotulo}
                    </option>
                ))}
            </Elemento>
            {ajuda && !erro && <p className="mt-1 text-xs text-cafe-claro">{ajuda}</p>}
            {erro && (
                <p id={idErro} className="mt-1 text-sm font-medium text-barro">
                    {erro}
                </p>
            )}
        </div>
    );
}
