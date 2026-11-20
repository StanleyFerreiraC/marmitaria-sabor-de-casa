<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriaResource;
use App\Services\CategoriaService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CardapioController extends Controller
{
    public function __construct(private readonly CategoriaService $categoriaService)
    {
    }

    public function __invoke(): AnonymousResourceCollection
    {
        return CategoriaResource::collection($this->categoriaService->montarCardapio());
    }
}
