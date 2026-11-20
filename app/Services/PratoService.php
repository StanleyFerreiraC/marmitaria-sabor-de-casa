<?php

namespace App\Services;

use App\Models\Categoria;
use App\Models\Prato;
use Illuminate\Database\Eloquent\Collection;

class PratoService
{
    public function listarPorCategoria(Categoria $categoria): Collection
    {
        return $categoria->pratos()->orderBy('nome')->get();
    }

    public function criar(Categoria $categoria, array $dados): Prato
    {
        return $categoria->pratos()->create($dados);
    }

    public function atualizar(Prato $prato, array $dados): Prato
    {
        $prato->update($dados);

        return $prato;
    }

    public function excluir(Prato $prato): void
    {
        $prato->delete();
    }
}
