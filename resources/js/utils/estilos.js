/**
 * Classes Tailwind reutilizadas, para não repetir as mesmas strings em cada tela.
 * As cores (barro, açafrão, folha, café, creme) estão definidas em resources/css/app.css.
 */
const botaoBase =
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barro disabled:opacity-50';

export const botao = {
    primario: `${botaoBase} bg-barro text-white shadow-sm hover:bg-barro-escuro`,
    secundario: `${botaoBase} border border-creme-escuro bg-white text-cafe hover:bg-creme`,
    perigo: `${botaoBase} border border-barro/30 bg-white text-barro hover:bg-barro/10`,
};

export const cartao = 'rounded-2xl border border-creme-escuro bg-white shadow-sm';

export const campoEntrada =
    'w-full rounded-xl border bg-white px-3 py-2 text-sm text-cafe outline-none transition focus:border-barro focus:ring-2 focus:ring-barro/20';

export const tituloDisplay = 'font-display font-semibold tracking-tight text-cafe';
