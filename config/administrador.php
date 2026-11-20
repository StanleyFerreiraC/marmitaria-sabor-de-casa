<?php

// Conta do gerente que administra o cardápio. Criada/atualizada pelo AdministradorSeeder.
return [
    'nome' => env('ADMIN_NAME', 'Gerente'),
    'email' => env('ADMIN_EMAIL'),
    'senha' => env('ADMIN_PASSWORD'),
];
