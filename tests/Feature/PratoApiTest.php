<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\Prato;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PratoApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_lista_apenas_pratos_da_categoria(): void
    {
        $marmitas = Categoria::factory()->create();
        $bebidas = Categoria::factory()->create();
        Prato::factory()->for($marmitas)->create(['nome' => 'Frango grelhado']);
        Prato::factory()->for($bebidas)->create(['nome' => 'Suco de cajá']);

        $this->getJson("/api/categorias/{$marmitas->id}/pratos")
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.nome', 'Frango grelhado');
    }

    public function test_cria_prato_na_categoria(): void
    {
        $categoria = Categoria::factory()->create();

        $this->postJson("/api/categorias/{$categoria->id}/pratos", ['nome' => 'Peixe ao molho', 'preco' => 22.5])
            ->assertCreated()
            ->assertJsonPath('data.categoria_id', $categoria->id)
            ->assertJsonPath('data.preco', 22.5)
            ->assertJsonPath('data.disponivel', true);
    }

    public function test_exige_campos_obrigatorios_do_prato(): void
    {
        $categoria = Categoria::factory()->create();

        $this->postJson("/api/categorias/{$categoria->id}/pratos", [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['nome', 'preco']);
    }

    public function test_recusa_preco_zero_ou_negativo(): void
    {
        $categoria = Categoria::factory()->create();

        foreach ([0, -5] as $precoInvalido) {
            $this->postJson("/api/categorias/{$categoria->id}/pratos", ['nome' => 'Teste', 'preco' => $precoInvalido])
                ->assertUnprocessable()
                ->assertJsonValidationErrors(['preco' => 'O preço deve ser maior que zero.']);
        }
    }

    public function test_atualiza_preco_e_disponibilidade(): void
    {
        $prato = Prato::factory()->create(['preco' => 10]);

        $this->putJson("/api/pratos/{$prato->id}", ['nome' => $prato->nome, 'preco' => 12.9, 'disponivel' => false])
            ->assertOk()
            ->assertJsonPath('data.preco', 12.9)
            ->assertJsonPath('data.disponivel', false);
    }

    public function test_move_prato_para_outra_categoria(): void
    {
        $destino = Categoria::factory()->create();
        $prato = Prato::factory()->create();

        $this->putJson("/api/pratos/{$prato->id}", ['categoria_id' => $destino->id, 'nome' => $prato->nome, 'preco' => 10])
            ->assertOk()
            ->assertJsonPath('data.categoria_id', $destino->id);
    }

    public function test_cadastro_usa_a_categoria_da_rota(): void
    {
        $categoria = Categoria::factory()->create();
        $outra = Categoria::factory()->create();

        $this->postJson("/api/categorias/{$categoria->id}/pratos", ['categoria_id' => $outra->id, 'nome' => 'Teste', 'preco' => 5])
            ->assertCreated()
            ->assertJsonPath('data.categoria_id', $categoria->id);
    }

    public function test_aceita_apenas_imagem_com_https(): void
    {
        $categoria = Categoria::factory()->create();
        $url = "/api/categorias/{$categoria->id}/pratos";

        $this->postJson($url, ['nome' => 'Teste', 'preco' => 5, 'imagem_url' => 'http://exemplo.com/foto.jpg'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['imagem_url']);

        $this->postJson($url, ['nome' => 'Teste', 'preco' => 5, 'imagem_url' => 'https://exemplo.com/foto.jpg'])
            ->assertCreated()
            ->assertJsonPath('data.imagem_url', 'https://exemplo.com/foto.jpg');
    }

    public function test_exclui_prato(): void
    {
        $prato = Prato::factory()->create();

        $this->deleteJson("/api/pratos/{$prato->id}")->assertNoContent();

        $this->assertDatabaseMissing('pratos', ['id' => $prato->id]);
    }

    public function test_cardapio_mostra_apenas_pratos_disponiveis(): void
    {
        $categoria = Categoria::factory()->create();
        Prato::factory()->for($categoria)->create(['nome' => 'Disponível']);
        Prato::factory()->for($categoria)->create(['nome' => 'Esgotado', 'disponivel' => false]);

        $this->getJson('/api/cardapio')
            ->assertOk()
            ->assertJsonCount(1, 'data.0.pratos')
            ->assertJsonPath('data.0.pratos.0.nome', 'Disponível');
    }
}
