<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Prato;
use Illuminate\Database\Seeder;

/**
 * Dados de exemplo da Sabor de Casa. Pode rodar mais de uma vez sem duplicar registros
 * e só preenche a foto de pratos que ainda não têm uma.
 * Fotos do Unsplash (licença gratuita); créditos no README.
 */
class CardapioSeeder extends Seeder
{
    private const CARDAPIO = [
        'Marmitas' => [
            'descricao' => 'Pratos do dia com arroz, feijão e salada',
            'pratos' => [
                ['nome' => 'Frango grelhado', 'descricao' => 'Peito de frango, arroz, feijão e salada', 'preco' => 18.90, 'foto' => '1788227372897-49ec292a9406'],
                ['nome' => 'Carne de sol com macaxeira', 'descricao' => 'Acompanha arroz e vinagrete', 'preco' => 24.90, 'foto' => '1678684277852-f63a7e359435'],
                ['nome' => 'Peixe ao molho', 'descricao' => 'Filé de tilápia, arroz e pirão', 'preco' => 22.50, 'foto' => '1621174438159-6a9a82405498'],
            ],
        ],
        'Bebidas' => [
            'descricao' => 'Sucos naturais e refrigerantes',
            'pratos' => [
                ['nome' => 'Suco de cajá 500 ml', 'descricao' => 'Feito com a polpa da fruta', 'preco' => 7.00, 'foto' => '1618881158808-8a20f18d516e'],
                ['nome' => 'Refrigerante lata', 'descricao' => '350 ml, sabores variados', 'preco' => 6.00, 'foto' => '1696739696220-8d2e27465662'],
            ],
        ],
        'Sobremesas' => [
            'descricao' => 'Doces caseiros',
            'pratos' => [
                ['nome' => 'Pudim de leite', 'descricao' => 'Fatia generosa com calda de caramelo', 'preco' => 8.00, 'foto' => '1702728109878-c61a98d80491'],
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

            foreach ($dadosCategoria['pratos'] as $dadosPrato) {
                $this->semearPrato($categoria, $dadosPrato);
            }
        }
    }

    private function semearPrato(Categoria $categoria, array $dadosPrato): void
    {
        $imagemUrl = self::urlUnsplash($dadosPrato['foto']);
        unset($dadosPrato['foto']);

        /** @var Prato $prato */
        $prato = $categoria->pratos()->firstOrCreate(['nome' => $dadosPrato['nome']], $dadosPrato);

        if (! $prato->imagem_url) {
            $prato->update(['imagem_url' => $imagemUrl]);
        }
    }

    private static function urlUnsplash(string $idFoto): string
    {
        return "https://images.unsplash.com/photo-{$idFoto}?w=800&q=75&auto=format&fit=crop";
    }
}
