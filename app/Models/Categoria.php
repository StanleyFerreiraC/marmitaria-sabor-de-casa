<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categorias';

    protected $fillable = ['nome', 'descricao'];

    public function pratos(): HasMany
    {
        return $this->hasMany(Prato::class);
    }

    public function possuiPratos(): bool
    {
        return $this->pratos()->exists();
    }

    /**
     * Verifica se o nome já pertence a outra categoria, sem diferenciar maiúsculas de minúsculas.
     */
    public static function nomeEmUso(string $nome, ?int $ignorarId = null): bool
    {
        return static::query()
            ->whereRaw('LOWER(nome) = ?', [mb_strtolower($nome)])
            ->when($ignorarId, fn ($query) => $query->whereKeyNot($ignorarId))
            ->exists();
    }
}
