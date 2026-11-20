<?php

namespace App\Services;

use App\Exceptions\CategoriaPossuiPratosException;
use App\Models\Categoria;
use Illuminate\Database\Eloquent\Collection;

class CategoriaService
{
    public function listar(): Collection
    {
        return Categoria::query()->withCount('pratos')->orderBy('nome')->get();
    }

    public function criar(array $dados): Categoria
    {
        return Categoria::create($dados);
    }

    public function atualizar(Categoria $categoria, array $dados): Categoria
    {
        $categoria->update($dados);

        return $categoria;
    }

    public function excluir(Categoria $categoria): void
    {
        if ($categoria->possuiPratos()) {
            throw new CategoriaPossuiPratosException();
        }

        $categoria->delete();
    }

    /**
     * Cardápio público: categorias com seus pratos disponíveis.
     */
    public function montarCardapio(): Collection
    {
        return Categoria::query()
            ->whereHas('pratos', fn ($query) => $query->where('disponivel', true))
            ->with(['pratos' => fn ($query) => $query->where('disponivel', true)->orderBy('nome')])
            ->orderBy('nome')
            ->get();
    }
}
