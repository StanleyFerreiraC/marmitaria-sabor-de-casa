<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriaRequest;
use App\Http\Resources\CategoriaResource;
use App\Models\Categoria;
use App\Services\CategoriaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class CategoriaController extends Controller
{
    public function __construct(private readonly CategoriaService $categoriaService)
    {
    }

    public function index(): AnonymousResourceCollection
    {
        return CategoriaResource::collection($this->categoriaService->listar());
    }

    public function store(CategoriaRequest $request): JsonResponse
    {
        $categoria = $this->categoriaService->criar($request->validated());

        return CategoriaResource::make($categoria)->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Categoria $categoria): CategoriaResource
    {
        return CategoriaResource::make($categoria->loadCount('pratos'));
    }

    public function update(CategoriaRequest $request, Categoria $categoria): CategoriaResource
    {
        return CategoriaResource::make($this->categoriaService->atualizar($categoria, $request->validated()));
    }

    public function destroy(Categoria $categoria): Response
    {
        $this->categoriaService->excluir($categoria);

        return response()->noContent();
    }
}
