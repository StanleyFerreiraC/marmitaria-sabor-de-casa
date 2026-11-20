<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\Prato;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoriaApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_lista_categorias_com_quantidade_de_pratos(): void
    {
        $categoria = Categoria::factory()->create(['nome' => 'Marmitas']);
        Prato::factory()->count(2)->for($categoria)->create();

        $this->getJson('/api/categorias')
            ->assertOk()
            ->assertJsonPath('data.0.nome', 'Marmitas')
            ->assertJsonPath('data.0.quantidade_pratos', 2);
    }

    public function test_cria_categoria(): void
    {
        $this->postJson('/api/categorias', ['nome' => 'Bebidas', 'descricao' => 'Sucos'])
            ->assertCreated()
            ->assertJsonPath('data.nome', 'Bebidas');

        $this->assertDatabaseHas('categorias', ['nome' => 'Bebidas']);
    }

    public function test_exige_nome_da_categoria(): void
    {
        $this->postJson('/api/categorias', ['nome' => ''])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['nome' => 'O nome da categoria é obrigatório.']);
    }

    public function test_recusa_nome_de_categoria_repetido_ignorando_maiusculas(): void
    {
        Categoria::factory()->create(['nome' => 'Bebidas']);

        $this->postJson('/api/categorias', ['nome' => 'BEBIDAS'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['nome' => 'Já existe uma categoria com este nome.']);
    }

    public function test_permite_editar_categoria_mantendo_o_proprio_nome(): void
    {
        $categoria = Categoria::factory()->create(['nome' => 'Bebidas']);

        $this->putJson("/api/categorias/{$categoria->id}", ['nome' => 'Bebidas', 'descricao' => 'Geladas'])
            ->assertOk()
            ->assertJsonPath('data.descricao', 'Geladas');
    }

    public function test_impede_excluir_categoria_com_pratos(): void
    {
        $categoria = Categoria::factory()->create();
        Prato::factory()->for($categoria)->create();

        $this->deleteJson("/api/categorias/{$categoria->id}")
            ->assertConflict()
            ->assertJsonPath('message', 'Não é possível excluir uma categoria que ainda possui pratos. Exclua os pratos ou mova-os para outra categoria antes.');

        $this->assertDatabaseHas('categorias', ['id' => $categoria->id]);
    }

    public function test_exclui_categoria_sem_pratos(): void
    {
        $categoria = Categoria::factory()->create();

        $this->deleteJson("/api/categorias/{$categoria->id}")->assertNoContent();

        $this->assertDatabaseMissing('categorias', ['id' => $categoria->id]);
    }

    public function test_retorna_404_para_categoria_inexistente(): void
    {
        $this->getJson('/api/categorias/999')
            ->assertNotFound()
            ->assertJsonPath('message', 'Registro não encontrado.');
    }
}
