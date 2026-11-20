<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Prato;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Prato>
 */
class PratoFactory extends Factory
{
    protected $model = Prato::class;

    public function definition(): array
    {
        return [
            'categoria_id' => Categoria::factory(),
            'nome' => fake()->words(3, true),
            'descricao' => fake()->sentence(),
            'preco' => fake()->randomFloat(2, 5, 50),
            'disponivel' => true,
        ];
    }
}
