<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prato extends Model
{
    use HasFactory;

    protected $table = 'pratos';

    protected $fillable = ['nome', 'descricao', 'preco', 'disponivel'];

    protected $attributes = ['disponivel' => true];

    protected function casts(): array
    {
        return [
            'preco' => 'decimal:2',
            'disponivel' => 'boolean',
        ];
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
}
