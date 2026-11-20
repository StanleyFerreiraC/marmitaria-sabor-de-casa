<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

/**
 * Dados de exemplo da Sabor de Casa. Pode rodar mais de uma vez sem duplicar registros.
 */
class CardapioSeeder extends Seeder
{
    private const CARDAPIO = [
        'Marmitas' => [
            'descricao' => 'Pratos do dia com arroz, feijão e salada',
            'pratos' => [
                ['nome' => 'Frango grelhado', 'descricao' => 'Peito de frango, arroz, feijão e salada', 'preco' => 18.90],
                ['nome' => 'Carne de sol com macaxeira', 'descricao' => 'Acompanha arroz e vinagrete', 'preco' => 24.90],
                ['nome' => 'Peixe ao molho', 'descricao' => 'Filé de tilápia, arroz e pirão', 'preco' => 22.50],
            ],
        ],
        'Bebidas' => [
            'descricao' => 'Sucos naturais e refrigerantes',
            'pratos' => [
                ['nome' => 'Suco de cajá 500 ml', 'descricao' => null, 'preco' => 7.00],
                ['nome' => 'Refrigerante lata', 'descricao' => null, 'preco' => 6.00],
            ],
        ],
        'Sobremesas' => [
            'descricao' => 'Doces caseiros',
            'pratos' => [
                ['nome' => 'Pudim de leite', 'descricao' => 'Fatia', 'preco' => 8.00],
            ],
        ],
    ];

    public function run(): void
    {
        foreach (self::CARDAPIO as $nomeCategoria => $dadosCategoria) {
            $categoria = Categoria::firstOrCreate(
                ['nome' => $nomeCategoria],
                ['descricao' => $dadosCategoria['descricao']],
            );

            foreach ($dadosCategoria['pratos'] as $prato) {
                $categoria->pratos()->firstOrCreate(['nome' => $prato['nome']], $prato);
            }
        }
    }
}
