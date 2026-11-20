<?php

use Illuminate\Support\Facades\Route;

// Qualquer rota que não seja /api é entregue à aplicação React, que cuida da navegação.
Route::view('/{caminho?}', 'app')->where('caminho', '^(?!api).*$');
