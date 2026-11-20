<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'senha' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Informe o e-mail.',
            'email.email' => 'Informe um e-mail válido.',
            'senha.required' => 'Informe a senha.',
        ];
    }

    public function credenciais(): array
    {
        return ['email' => $this->validated('email'), 'password' => $this->validated('senha')];
    }
}
