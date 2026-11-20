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
- **Prato**: `nome` (obrigatório), `descricao`, `preco` (> 0), `disponivel`, `categoria_id`

Relação 1:N: uma categoria reúne vários pratos e cada prato pertence a uma categoria. Veja as [migrations](database/migrations).

## Serviço web (API REST)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/categorias` | Lista as categorias com a quantidade de pratos |
| POST | `/api/categorias` | Cria uma categoria |
| GET | `/api/categorias/{id}` | Busca uma categoria |
| PUT | `/api/categorias/{id}` | Atualiza uma categoria |
| DELETE | `/api/categorias/{id}` | Exclui a categoria (409 se ainda tiver pratos) |
| GET | `/api/categorias/{id}/pratos` | Lista os pratos da categoria |
| POST | `/api/categorias/{id}/pratos` | Cria um prato na categoria |
| GET | `/api/pratos/{id}` | Busca um prato |
| PUT | `/api/pratos/{id}` | Atualiza um prato |
| DELETE | `/api/pratos/{id}` | Exclui um prato |
| GET | `/api/cardapio` | Cardápio público (só pratos disponíveis) |

Respostas de erro:

| Status | Quando | Corpo |
|---|---|---|
| 422 | Validação falhou | `{ "message": "...", "errors": { "campo": ["mensagem"] } }` |
| 409 | Excluir categoria com pratos | `{ "message": "Não é possível excluir..." }` |
| 404 | Registro inexistente | `{ "message": "Registro não encontrado." }` |

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
php artisan migrate --seed    # cria o SQLite e carrega o cardápio de exemplo
npm run build
php artisan serve             # http://localhost:8000
```

Durante o desenvolvimento, rode `npm run dev` em outro terminal para recarregar o front automaticamente.

Testes automatizados da API: `php artisan test`

## Publicação (Render + Neon)

1. Crie um banco PostgreSQL gratuito no [Neon](https://neon.tech) e copie a connection string.
2. No [Render](https://render.com), crie um **Web Service** a partir deste repositório, com runtime **Docker**.
3. Configure as variáveis de ambiente:

   | Variável | Valor |
   |---|---|
   | `APP_KEY` | saída de `php artisan key:generate --show` |
   | `APP_ENV` | `production` |
   | `APP_DEBUG` | `false` |
   | `APP_URL` | URL gerada pelo Render |
   | `DB_CONNECTION` | `pgsql` |
   | `DB_URL` | connection string do Neon (com `?sslmode=require`) |
   | `LOG_CHANNEL` | `stderr` |
   | `SEMEAR_DADOS` | `true` no primeiro deploy; depois remova |

4. O container roda as migrations sozinho ao iniciar ([entrypoint.sh](docker/entrypoint.sh)).

Observação: no plano gratuito do Render o serviço "dorme" após um tempo sem acesso, e a primeira requisição pode levar cerca de 1 minuto. Abra o link antes de apresentar.

## Uso de IA generativa

_Declarar aqui e na seção 11 do PDF quais ferramentas foram usadas e de que forma._
