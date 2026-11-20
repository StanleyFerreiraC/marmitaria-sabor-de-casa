<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validação usada tanto no cadastro quanto na edição de prato.
 */
class PratoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:100'],
            'descricao' => ['nullable', 'string', 'max:255'],
            'preco' => ['required', 'numeric', 'gt:0', 'max:99999.99'],
            'disponivel' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do prato é obrigatório.',
            'nome.max' => 'O nome do prato deve ter no máximo 100 caracteres.',
            'descricao.max' => 'A descrição deve ter no máximo 255 caracteres.',
            'preco.required' => 'O preço é obrigatório.',
            'preco.numeric' => 'O preço deve ser um número.',
            'preco.gt' => 'O preço deve ser maior que zero.',
            'preco.max' => 'O preço deve ser no máximo R$ 99.999,99.',
            'disponivel.boolean' => 'O campo disponível deve ser verdadeiro ou falso.',
        ];
    }
}
