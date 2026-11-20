<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Cria ou atualiza a conta do gerente a partir de ADMIN_EMAIL e ADMIN_PASSWORD.
 * Não há cadastro público: só essa conta acessa a área administrativa.
 */
class AdministradorSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('administrador.email');
        $senha = config('administrador.senha');

        if (! $email || ! $senha) {
            $this->command?->warn('ADMIN_EMAIL/ADMIN_PASSWORD não definidos: conta do gerente não criada.');

            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            ['name' => config('administrador.nome'), 'password' => $senha],
        );
    }
}
