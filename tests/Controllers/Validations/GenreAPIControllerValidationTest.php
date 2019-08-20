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

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_genre_fails_when_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/genres/', ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_genre_fails_when_name_is_not_passed()
    {
        $genre = factory(Genre::class)->create();

        $response = $this->putJson('api/b1/genres/'.$genre->id, ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_genre_fails_when_name_is_duplicate()
    {
        $genre = factory(Genre::class)->create();

        $response = $this->postJson('api/b1/genres/', ['name' => $genre->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_genre_fails_when_name_is_duplicate()
    {
        $genre1 = factory(Genre::class)->create();
        $genre2 = factory(Genre::class)->create();

        $response = $this->putJson('api/b1/genres/'.$genre2->id, ['name' => $genre1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_genre()
    {
        $name = $this->faker->name;
        $response = $this->postJson('api/b1/genres', ['name' => $name]);

        $this->assertSuccessMessageResponse($response, 'Genre saved successfully.');
        $this->assertNotEmpty(Genre::whereName($name)->first());
    }

    /** @test */
    public function it_can_update_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();

        $newName = $this->faker->name;
        $response = $this->putJson('api/b1/genres/'.$genre->id, ['name' => $newName]);

        $this->assertSuccessMessageResponse($response, 'Genre updated successfully.');
        $this->assertEquals($newName, $genre->fresh()->name);
    }
}
