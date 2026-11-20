<?php

namespace App\Http\Controllers;

use App\Http\Requests\PratoRequest;
use App\Http\Resources\PratoResource;
use App\Models\Categoria;
use App\Models\Prato;
use App\Services\PratoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class PratoController extends Controller
{
    public function __construct(private readonly PratoService $pratoService)
    {
    }

    public function index(Categoria $categoria): AnonymousResourceCollection
    {
        return PratoResource::collection($this->pratoService->listarPorCategoria($categoria));
    }

    public function store(PratoRequest $request, Categoria $categoria): JsonResponse
    {
        $prato = $this->pratoService->criar($categoria, $request->validated());

        return PratoResource::make($prato)->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Prato $prato): PratoResource
    {
        return PratoResource::make($prato);
    }

    public function update(PratoRequest $request, Prato $prato): PratoResource
    {
        return PratoResource::make($this->pratoService->atualizar($prato, $request->validated()));
    }

    public function destroy(Prato $prato): Response
    {
        $this->pratoService->excluir($prato);

        return response()->noContent();
    }
}
