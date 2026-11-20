<?php

namespace App\Http\Requests;

use App\Models\Categoria;
use Closure;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validação usada tanto no cadastro quanto na edição de categoria.
 */
class CategoriaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:80', $this->nomeNaoRepetido()],
            'descricao' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da categoria é obrigatório.',
            'nome.max' => 'O nome da categoria deve ter no máximo 80 caracteres.',
            'descricao.max' => 'A descrição deve ter no máximo 255 caracteres.',
        ];
    }

    private function nomeNaoRepetido(): Closure
    {
        $categoriaEmEdicao = $this->route('categoria');

        return function (string $atributo, mixed $valor, Closure $falhar) use ($categoriaEmEdicao) {
            if (is_string($valor) && Categoria::nomeEmUso($valor, $categoriaEmEdicao?->id)) {
                $falhar('Já existe uma categoria com este nome.');
            }
        };
    }
}
