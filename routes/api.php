<?php

use App\Http\Controllers\CardapioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PratoController;
use Illuminate\Support\Facades\Route;

// GET/POST /api/categorias  |  GET/PUT/DELETE /api/categorias/{categoria}
Route::apiResource('categorias', CategoriaController::class)
    ->parameters(['categorias' => 'categoria']);

// GET/POST /api/categorias/{categoria}/pratos  |  GET/PUT/DELETE /api/pratos/{prato}
Route::apiResource('categorias.pratos', PratoController::class)
    ->parameters(['categorias' => 'categoria', 'pratos' => 'prato'])
    ->shallow();

// Cardápio público: só pratos disponíveis, agrupados por categoria.
Route::get('cardapio', CardapioController::class);
