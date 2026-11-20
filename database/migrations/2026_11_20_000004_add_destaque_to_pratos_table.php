<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Pratos do cardápio de exemplo que já nascem como destaque da casa.
    private const DESTAQUES_INICIAIS = ['Carne de sol com macaxeira', 'Peixe ao molho', 'Pudim de leite'];

    public function up(): void
    {
        Schema::table('pratos', function (Blueprint $table) {
            $table->boolean('destaque')->default(false)->after('disponivel');
        });

        DB::table('pratos')->whereIn('nome', self::DESTAQUES_INICIAIS)->update(['destaque' => true]);
    }

    public function down(): void
    {
        Schema::table('pratos', function (Blueprint $table) {
            $table->dropColumn('destaque');
        });
    }
};
