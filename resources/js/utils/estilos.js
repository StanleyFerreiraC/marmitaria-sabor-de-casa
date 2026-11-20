/**
 * Classes Tailwind reutilizadas, para não repetir as mesmas strings em cada tela.
 */
const botaoBase = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50';

export const botao = {
    primario: `${botaoBase} bg-orange-600 text-white hover:bg-orange-700`,
    secundario: `${botaoBase} border border-stone-300 bg-white text-stone-700 hover:bg-stone-100`,
    perigo: `${botaoBase} border border-red-200 bg-white text-red-700 hover:bg-red-50`,
};

export const cartao = 'rounded-xl border border-stone-200 bg-white shadow-sm';

export const campoEntrada =
    'w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300';
