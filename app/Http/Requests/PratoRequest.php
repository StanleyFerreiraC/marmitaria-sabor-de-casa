<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validação usada tanto no cadastro quanto na edição de prato.
 * Na edição, categoria_id permite mover o prato para outra categoria.
 */
class PratoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'categoria_id' => ['sometimes', 'integer', 'exists:categorias,id'],
            'nome' => ['required', 'string', 'max:100'],
            'descricao' => ['nullable', 'string', 'max:255'],
            'imagem_url' => ['nullable', 'url:https', 'max:500'],
            'preco' => ['required', 'numeric', 'gt:0', 'max:99999.99'],
            'disponivel' => ['sometimes', 'boolean'],
            'destaque' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'categoria_id.exists' => 'A categoria escolhida não existe.',
            'nome.required' => 'O nome do prato é obrigatório.',
            'nome.max' => 'O nome do prato deve ter no máximo 100 caracteres.',
            'descricao.max' => 'A descrição deve ter no máximo 255 caracteres.',
            'imagem_url.url' => 'Informe um endereço de imagem válido, começando com https://.',
            'imagem_url.max' => 'O endereço da imagem deve ter no máximo 500 caracteres.',
            'preco.required' => 'O preço é obrigatório.',
            'preco.numeric' => 'O preço deve ser um número.',
            'preco.gt' => 'O preço deve ser maior que zero.',
            'preco.max' => 'O preço deve ser no máximo R$ 99.999,99.',
            'disponivel.boolean' => 'O campo disponível deve ser verdadeiro ou falso.',
            'destaque.boolean' => 'O campo destaque deve ser verdadeiro ou falso.',
        ];
    }
}
