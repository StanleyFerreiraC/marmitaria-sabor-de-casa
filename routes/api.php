<?php

use App\Http\Controllers\AutenticacaoController;
use App\Http\Controllers\CardapioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PratoController;
use Illuminate\Support\Facades\Route;

// Área pública: cardápio com os pratos disponíveis, agrupados por categoria.
Route::get('cardapio', CardapioController::class);

// Login do gerente (no máximo 5 tentativas por minuto, contra força bruta).
Route::post('login', [AutenticacaoController::class, 'login'])->middleware('throttle:5,1');

// Área administrativa: exige gerente autenticado.
Route::middleware('auth:sanctum')->group(function () {
    Route::get('usuario', [AutenticacaoController::class, 'usuario']);
    Route::post('logout', [AutenticacaoController::class, 'logout']);

    // GET/POST /api/categorias  |  GET/PUT/DELETE /api/categorias/{categoria}
    Route::apiResource('categorias', CategoriaController::class)
        ->parameters(['categorias' => 'categoria']);

    // GET/POST /api/categorias/{categoria}/pratos  |  GET/PUT/DELETE /api/pratos/{prato}
    Route::apiResource('categorias.pratos', PratoController::class)
        ->parameters(['categorias' => 'categoria', 'pratos' => 'prato'])
        ->shallow();
});
