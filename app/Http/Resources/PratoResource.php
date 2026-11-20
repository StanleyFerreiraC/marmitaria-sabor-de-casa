<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PratoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'categoria_id' => $this->categoria_id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'imagem_url' => $this->imagem_url,
            'preco' => (float) $this->preco,
            'disponivel' => $this->disponivel,
            'destaque' => $this->destaque,
        ];
    }
}
