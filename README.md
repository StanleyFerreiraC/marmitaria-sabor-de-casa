# Sabor de Casa · Cardápio digital

Trabalho da disciplina **N695 - Desenvolvimento de Plataformas Web** (Unifor), **Cenário 3: Marmitaria com cardápio digital**.

A proprietária mantém o cardápio organizado por **categorias** e **pratos**. Quando um prato acaba ou muda de preço, ela atualiza no sistema e o cardápio público (`/cardapio`) passa a mostrar a versão correta na hora, no lugar da foto antiga do quadro.

- **Aplicação publicada:** https://sabor-de-casa.147.15.94.117.sslip.io
- **Cardápio público:** https://sabor-de-casa.147.15.94.117.sslip.io/cardapio
- **Repositório:** https://github.com/StanleyFerreiraC/marmitaria-sabor-de-casa

## Stack

| Camada | Tecnologia |
|---|---|
| Interface | React 19 + React Router, Tailwind CSS, Vite |
| Serviço web | Laravel 13 (PHP 8.3), API REST em JSON |
| Persistência | Banco relacional via Eloquent ORM: PostgreSQL em produção, SQLite no desenvolvimento |
| Hospedagem | VPS com Coolify (container Docker + PostgreSQL 17) |

## Entidades

- **Categoria**: `nome` (obrigatório, único), `descricao`
- **Prato**: `nome` (obrigatório), `descricao`, `imagem_url` (https), `preco` (> 0), `disponivel`, `categoria_id`

Relação 1:N: uma categoria reúne vários pratos e cada prato pertence a uma categoria. Veja as [migrations](database/migrations).

## Áreas do site

- **Pública** (`/`): cardápio com fotos, só com os pratos disponíveis.
- **Gerente** (`/admin`, exige login em `/login`): CRUD de categorias e pratos.

Não há cadastro público de usuários. A conta do gerente é criada pelo [AdministradorSeeder](database/seeders/AdministradorSeeder.php) a partir de `ADMIN_EMAIL` e `ADMIN_PASSWORD`. A autenticação usa o Laravel Sanctum no modo SPA: cookie de sessão HttpOnly, proteção CSRF e limite de 5 tentativas de login por minuto.

## Serviço web (API REST)

Todas as rotas, exceto `/api/cardapio` e `/api/login`, exigem o gerente logado e retornam 401 sem login.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/login` | Entra como gerente (`email`, `senha`) |
| POST | `/api/logout` | Sai |
| GET | `/api/usuario` | Gerente logado |
| GET | `/api/categorias` | Lista as categorias com a quantidade de pratos |
| POST | `/api/categorias` | Cria uma categoria |
| GET | `/api/categorias/{id}` | Busca uma categoria |
| PUT | `/api/categorias/{id}` | Atualiza uma categoria |
| DELETE | `/api/categorias/{id}` | Exclui a categoria (409 se ainda tiver pratos) |
| GET | `/api/categorias/{id}/pratos` | Lista os pratos da categoria |
| POST | `/api/categorias/{id}/pratos` | Cria um prato na categoria |
| GET | `/api/pratos/{id}` | Busca um prato |
| PUT | `/api/pratos/{id}` | Atualiza um prato (com `categoria_id`, move de categoria) |
| DELETE | `/api/pratos/{id}` | Exclui um prato |
| GET | `/api/cardapio` | Cardápio público (só pratos disponíveis) |

Respostas de erro:

| Status | Quando | Corpo |
|---|---|---|
| 422 | Validação falhou | `{ "message": "...", "errors": { "campo": ["mensagem"] } }` |
| 409 | Excluir categoria com pratos | `{ "message": "Não é possível excluir..." }` |
| 404 | Registro inexistente | `{ "message": "Registro não encontrado." }` |
| 401 | Sem login | `{ "message": "Faça login para continuar." }` |
| 429 | Muitas tentativas de login | `{ "message": "Muitas tentativas..." }` |

## Regras do cenário e onde estão

| Regra | Servidor | Interface |
|---|---|---|
| Campos obrigatórios | [CategoriaRequest](app/Http/Requests/CategoriaRequest.php), [PratoRequest](app/Http/Requests/PratoRequest.php) | [validacoes.js](resources/js/utils/validacoes.js) |
| Preço maior que zero | [PratoRequest](app/Http/Requests/PratoRequest.php) (`gt:0`) | [validacoes.js](resources/js/utils/validacoes.js) |
| Nome de categoria sem repetição (ignora maiúsculas) | [CategoriaRequest](app/Http/Requests/CategoriaRequest.php) + [Categoria::nomeEmUso](app/Models/Categoria.php) + índice `unique` | mensagem do servidor exibida no campo |
| Não excluir categoria com pratos | [CategoriaService::excluir](app/Services/CategoriaService.php) + FK `restrictOnDelete` | mensagem de erro na lista |

## Organização em camadas (clean code)

```
Interface (React)   resources/js/pages, components  → telas e formulários
                    resources/js/services            → única porta de acesso à API
Serviço (Laravel)   app/Http/Controllers             → finos: recebem e devolvem HTTP
                    app/Http/Requests                → validação de entrada
                    app/Services                     → regras de negócio
                    app/Http/Resources               → formato do JSON de saída
Dados               app/Models + database/migrations → Eloquent e esquema do banco
```

Para evitar duplicação, o mesmo FormRequest serve para criar e para editar, e o hook [useFormulario](resources/js/hooks/useFormulario.js) é usado pelos dois formulários. O [CampoFormulario](resources/js/components/CampoFormulario.jsx) é usado por todos os campos, e o [api.js](resources/js/services/api.js) centraliza o tratamento de erros HTTP.

## Rodando localmente

Requisitos: PHP 8.3+, Composer, Node 20+.

```bash
composer install
npm install
cp .env.example .env          # no Windows: copy .env.example .env
php artisan key:generate
php artisan migrate --seed    # cria o SQLite, o gerente local e o cardápio de exemplo
npm run build
php artisan serve             # http://localhost:8000
```

Durante o desenvolvimento, rode `npm run dev` em outro terminal para recarregar o front automaticamente. O login local usa `ADMIN_EMAIL`/`ADMIN_PASSWORD` do `.env`. Acesse por `http://localhost:8000`, porque o Sanctum só aceita a sessão vinda do domínio configurado em `APP_URL`.

Testes automatizados da API: `php artisan test`

## Publicação

A aplicação roda em uma VPS gerenciada pelo [Coolify](https://coolify.io), que constrói a imagem a partir do [Dockerfile](Dockerfile) deste repositório. O PostgreSQL roda em outro container no mesmo servidor, e o Traefik do Coolify cuida do HTTPS.

Variáveis de ambiente do container:

| Variável | Valor |
|---|---|
| `APP_KEY` | saída de `php artisan key:generate --show` |
| `APP_ENV` / `APP_DEBUG` | `production` / `false` |
| `APP_URL` | URL pública da aplicação |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | dados do container PostgreSQL |
| `LOG_CHANNEL` | `stderr` |
| `SEMEAR_DADOS` | `true` só no primeiro deploy (carrega o cardápio de exemplo) |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | conta do gerente (criada/atualizada a cada deploy) |
| `SESSION_DRIVER` / `SESSION_SECURE_COOKIE` | `database` / `true` |

Ao iniciar, o container roda as migrations sozinho ([entrypoint.sh](docker/entrypoint.sh)). O mesmo Dockerfile também funciona em outras hospedagens que aceitam Docker, como Render ou Railway.

## Créditos das fotos

Fotos ilustrativas do [Unsplash](https://unsplash.com), sob a [Licença Unsplash](https://unsplash.com/license), usadas por link direto (hotlink):

| Uso | Fotógrafo(a) | ID da foto |
|---|---|---|
| Capa do cardápio | thiago japyassu | `1709114107937-6dec855d9ab5` |
| Tela de login | reyvenshots | `1628521061262-19b5cdb7eee5` |
| Frango grelhado | Bayu Syaits | `1788227372897-49ec292a9406` |
| Carne de sol com macaxeira | Natalia Gusakova | `1678684277852-f63a7e359435` |
| Peixe ao molho | henry perks | `1621174438159-6a9a82405498` |
| Suco de cajá | Nathália Arantes | `1618881158808-8a20f18d516e` |
| Refrigerante lata | Ambo Ampeng | `1696739696220-8d2e27465662` |
| Pudim de leite | Felippe Lopes | `1702728109878-c61a98d80491` |

## Uso de IA generativa

_Declarar aqui e na seção 11 do PDF quais ferramentas foram usadas e de que forma._
