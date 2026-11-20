<?php

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;
use RuntimeException;

class CategoriaPossuiPratosException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir uma categoria que ainda possui pratos. Exclua os pratos ou mova-os para outra categoria antes.');
    }

    public function render(): JsonResponse
    {
        return response()->json(['message' => $this->getMessage()], JsonResponse::HTTP_CONFLICT);
    }
}
