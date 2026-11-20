<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pratos', function (Blueprint $table) {
            $table->id();
            // restrictOnDelete: o próprio banco recusa excluir uma categoria que ainda tem pratos.
            $table->foreignId('categoria_id')->constrained('categorias')->restrictOnDelete();
            $table->string('nome', 100);
            $table->string('descricao', 255)->nullable();
            $table->decimal('preco', 8, 2);
            $table->boolean('disponivel')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pratos');
    }
};
