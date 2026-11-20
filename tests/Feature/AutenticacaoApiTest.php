<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AutenticacaoApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // O Sanctum só usa sessão para requisições vindas do próprio site.
        $this->withHeader('Referer', 'http://localhost');
    }

    public function test_area_administrativa_exige_login(): void
    {
        $this->getJson('/api/categorias')
            ->assertUnauthorized()
            ->assertJsonPath('message', 'Faça login para continuar.');
    }

    public function test_cardapio_e_publico(): void
    {
        $this->getJson('/api/cardapio')->assertOk();
    }

    public function test_gerente_faz_login(): void
    {
        User::factory()->create(['email' => 'gerente@sabordecasa.test', 'password' => 'senha-correta']);

        $this->postJson('/api/login', ['email' => 'gerente@sabordecasa.test', 'senha' => 'senha-correta'])
            ->assertOk()
            ->assertJsonPath('data.email', 'gerente@sabordecasa.test');

        $this->assertAuthenticated();
    }

    public function test_recusa_senha_incorreta(): void
    {
        User::factory()->create(['email' => 'gerente@sabordecasa.test', 'password' => 'senha-correta']);

        $this->postJson('/api/login', ['email' => 'gerente@sabordecasa.test', 'senha' => 'errada'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email' => 'E-mail ou senha incorretos.']);

        $this->assertGuest();
    }

    public function test_exige_email_e_senha(): void
    {
        $this->postJson('/api/login', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'senha']);
    }

    public function test_gerente_faz_logout(): void
    {
        $this->actingAs(User::factory()->create());

        $this->postJson('/api/logout')->assertNoContent();

        $this->assertGuest('web');
    }
}
