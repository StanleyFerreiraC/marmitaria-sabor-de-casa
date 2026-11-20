import { useState } from 'react';
import { ErroApi } from '../services/api';

/**
 * Estado e envio de formulário, compartilhado pelos cadastros de categoria e de prato.
 */
export function useFormulario({ valoresIniciais, validar, enviar }) {
    const [valores, setValores] = useState(valoresIniciais);
    const [erros, setErros] = useState({});
    const [erroGeral, setErroGeral] = useState('');
    const [enviando, setEnviando] = useState(false);

    function alterarCampo(evento) {
        const { name, value, type, checked } = evento.target;
        setValores((atuais) => ({ ...atuais, [name]: type === 'checkbox' ? checked : value }));
        setErros((atuais) => ({ ...atuais, [name]: undefined }));
    }

    async function aoEnviar(evento) {
        evento.preventDefault();
        setErroGeral('');

        const errosLocais = validar(valores);
        setErros(errosLocais);
        if (Object.keys(errosLocais).length > 0) {
            return;
        }

        setEnviando(true);
        try {
            await enviar(valores);
        } catch (falha) {
            setErros(falha instanceof ErroApi ? falha.errosDeCampo : {});
            setErroGeral(falha.message);
        } finally {
            setEnviando(false);
        }
    }

    return { valores, erros, erroGeral, enviando, alterarCampo, aoEnviar };
}
