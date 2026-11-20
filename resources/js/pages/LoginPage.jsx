import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import Marca from '../components/Marca';
import Mensagem from '../components/Mensagem';
import { useAutenticacao } from '../contexts/AutenticacaoContext';
import { useFormulario } from '../hooks/useFormulario';
import { botao, tituloDisplay } from '../utils/estilos';
import { fotos, rotas } from '../utils/rotas';
import { validarLogin } from '../utils/validacoes';

export default function LoginPage() {
    const { usuario, verificando } = useAutenticacao();

    if (verificando) {
        return null;
    }
    if (usuario) {
        return <Navigate to={rotas.categorias()} replace />;
    }

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <aside className="relative hidden overflow-hidden bg-cafe lg:block">
                <img src={fotos.login} alt="" className="absolute inset-0 size-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe via-cafe/30 to-transparent" />
                <div className="absolute bottom-0 p-12">
                    <p className="font-display text-4xl font-bold leading-tight text-white">
                        O cardápio certo,
                        <br />
                        no ar em segundos.
                    </p>
                    <p className="mt-3 max-w-md text-white/80">
                        Mudou o preço ou o prato acabou? Atualize aqui e o cliente vê na hora.
                    </p>
                </div>
            </aside>
            <main className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-sm">
                    <Marca subtitulo="Área do gerente" />
                    <h1 className={`mt-10 text-3xl ${tituloDisplay}`}>Entrar</h1>
                    <p className="mt-1 text-sm text-cafe-claro">Use o e-mail e a senha do gerente.</p>
                    <FormularioLogin />
                    <Link to={rotas.cardapio()} className="mt-8 inline-block text-sm font-semibold text-barro hover:text-barro-escuro">
                        ← Voltar ao cardápio
                    </Link>
                </div>
            </main>
        </div>
    );
}

function FormularioLogin() {
    const { entrar } = useAutenticacao();
    const navigate = useNavigate();
    const location = useLocation();
    const formulario = useFormulario({
        valoresIniciais: { email: '', senha: '' },
        validar: validarLogin,
        enviar: async ({ email, senha }) => {
            await entrar(email, senha);
            navigate(location.state?.voltarPara ?? rotas.categorias(), { replace: true });
        },
    });

    return (
        <form noValidate onSubmit={formulario.aoEnviar} className="mt-8">
            <Mensagem tipo="erro">{formulario.erroGeral}</Mensagem>
            <CampoFormulario
                rotulo="E-mail"
                nome="email"
                type="email"
                autoComplete="username"
                value={formulario.valores.email}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.email}
            />
            <CampoFormulario
                rotulo="Senha"
                nome="senha"
                type="password"
                autoComplete="current-password"
                value={formulario.valores.senha}
                onChange={formulario.alterarCampo}
                erro={formulario.erros.senha}
            />
            <button type="submit" disabled={formulario.enviando} className={`${botao.primario} mt-2 w-full py-3`}>
                {formulario.enviando ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
}
