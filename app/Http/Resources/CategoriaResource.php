<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoriaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'quantidade_pratos' => $this->whenCounted('pratos'),
            'pratos' => PratoResource::collection($this->whenLoaded('pratos')),
        ];
    }
}
