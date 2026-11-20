import { tituloSecao } from '../../utils/estilos';
import { formatarPreco } from '../../utils/formatarPreco';
import ImagemPrato from '../ImagemPrato';
import SeloDestaque from './SeloDestaque';

/**
 * "Destaques da casa": cartões grandes com foto, roláveis na horizontal.
 */
export default function CarrosselDestaques({ pratos }) {
    if (pratos.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="titulo-destaques" className="pt-6">
            <h2 id="titulo-destaques" className={`mb-4 text-2xl ${tituloSecao}`}>Destaques da casa</h2>
            <ul className="sem-barra-rolagem -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
                {pratos.map((prato) => (
                    <li key={prato.id} className="relative h-60 w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-superficie sm:w-72">
                        <ImagemPrato url={prato.imagem_url} nome={prato.nome} className="absolute inset-0 size-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <SeloDestaque className="absolute top-3 left-3" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                            <h3 className="line-clamp-2 font-display text-lg leading-tight font-extrabold uppercase text-white">{prato.nome}</h3>
                            <p className="mt-1 font-display text-lg font-bold text-destaque">{formatarPreco(prato.preco)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
