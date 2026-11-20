/**
 * Classes Tailwind reutilizadas, para não repetir as mesmas strings em cada tela.
 * As cores (fundo, superfície, destaque...) estão definidas em resources/css/app.css.
 */
const botaoBase =
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque disabled:opacity-50';

export const botao = {
    primario: `${botaoBase} bg-destaque text-sobre-destaque shadow-lg shadow-destaque/10 hover:bg-destaque-forte`,
    secundario: `${botaoBase} border border-borda bg-superficie-alta text-texto hover:border-texto-suave`,
    perigo: `${botaoBase} border border-perigo/40 bg-transparent text-perigo hover:bg-perigo/10`,
};

export const cartao = 'rounded-2xl border border-borda bg-superficie';

export const campoEntrada =
    'w-full rounded-xl border bg-superficie-alta px-3 py-2.5 text-sm text-texto placeholder:text-texto-suave/70 outline-none transition focus:border-destaque focus:ring-2 focus:ring-destaque/20';

export const tituloDisplay = 'font-display font-extrabold uppercase tracking-tight text-texto';

/** Título de seção com a barra de destaque à esquerda. */
export const tituloSecao = `border-l-4 border-destaque pl-3 ${tituloDisplay}`;
