<?php

namespace Tests\Controllers\Validations;

use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class GenreAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_genre_fails_when_name_is_not_passed()
    {
        $this->post('api/b1/genres/', ['genre' => ''])
            ->assertSessionHasErrors(['genre' => 'The genre field is required.']);
    }

    /** @test */
    public function test_update_genre_fails_when_name_is_not_passed()
    {
        $genre = factory(Genre::class)->create();

        $this->put('api/b1/genres/'.$genre->id, ['genre' => ''])
            ->assertSessionHasErrors(['genre' => 'The genre field is required.']);
    }

    /** @test */
    public function test_create_genre_fails_when_name_is_duplicate()
    {
        $genre = factory(Genre::class)->create();

        $this->post('api/b1/genres/', ['name' => $genre->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function test_update_genre_fails_when_name_is_duplicate()
    {
        $genre1 = factory(Genre::class)->create();
        $genre2 = factory(Genre::class)->create();

        $this->put('api/b1/genres/'.$genre2->id, ['name' => $genre1->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function it_can_store_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->make();

        $response = $this->postJson('api/b1/genres', $genre->toArray());
        $this->assertSuccessMessageResponse($response, 'Genre saved successfully.');
    }

    /** @test */
    public function it_can_update_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();

        $response = $this->putJson('api/b1/genres/'.$genre->id, ['name' => 'Ankit']);
        $this->assertSuccessMessageResponse($response, 'Genre updated successfully.');
    }
}
