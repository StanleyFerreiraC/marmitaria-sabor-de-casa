<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

/**
 * Login por sessão (cookie HttpOnly) para a área do gerente, via Laravel Sanctum.
 */
class AutenticacaoController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (! Auth::guard('web')->attempt($request->credenciais())) {
            throw ValidationException::withMessages(['email' => 'E-mail ou senha incorretos.']);
        }

        $request->session()->regenerate();

        return $this->usuarioLogado($request);
    }

    public function usuario(Request $request): JsonResponse
    {
        return $this->usuarioLogado($request);
    }

    public function logout(Request $request): Response
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }

    private function usuarioLogado(Request $request): JsonResponse
    {
        $usuario = $request->user();

        return response()->json(['data' => ['nome' => $usuario->name, 'email' => $usuario->email]]);
    }
}
