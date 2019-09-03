<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Genre;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use JWTAuth;
use Tests\TestCase;

/**
 * Class GenrePermissionAPITest
 * @package Tests\B1\APIs\Permissions
 */
class GenrePermissionAPITest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = JWTAuth::fromUser($this->loggedInUserId);
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_get_genres_without_permission()
    {
        $response = $this->getJson(route('api.b1.genres.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_genre_without_permission()
    {
        $fakeGenre = factory(Genre::class)->raw();

        $response = $this->postJson(route('api.b1.genres.store'), $fakeGenre);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    public function test_not_allow_to_update_genre_without_permission()
    {
        $genre = factory(Genre::class)->create();
        $updateGenre = factory(Genre::class)->raw(['id' => $genre->id]);

        $response = $this->putJson(route('api.b1.genres.update', $genre->id), $updateGenre);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_genre_without_permission()
    {
        $genre = factory(Genre::class)->create();

        $response = $this->deleteJson(route('api.b1.genres.destroy', $genre->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_genres_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_genres']);

        $response = $this->getJson(route('api.b1.genres.index'));

        $this->assertSuccessMessageResponse($response, 'Genres retrieved successfully.');
    }

    /** @test */
    public function test_create_genre_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_genres']);
        $fakeGenre = factory(Genre::class)->raw();

        $response = $this->postJson(route('api.b1.genres.store'), $fakeGenre);

        $this->assertSuccessMessageResponse($response, 'Genre saved successfully.');
    }

    public function test_can_update_genre_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_genres']);
        $genre = factory(Genre::class)->create();
        $updateGenre = factory(Genre::class)->raw(['id' => $genre->id]);

        $response = $this->putJson(route('api.b1.genres.update', $genre->id), $updateGenre);

        $this->assertSuccessMessageResponse($response, 'Genre updated successfully.');
    }

    /** @test */
    public function test_can_delete_genre_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_genres']);
        $genre = factory(Genre::class)->create();

        $response = $this->deleteJson(route('api.b1.genres.destroy', $genre->id));

        $this->assertSuccessMessageResponse($response, 'Genre deleted successfully.');;
    }

    /**
     * @test
     */
    public function test_can_show_genre_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_genres']);
        $genre = factory(Genre::class)->create();

        $response = $this->getJson(route('api.b1.genres.show', $genre->id));

        $this->assertSuccessMessageResponse($response, 'Genre retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_genre_without_permission()
    {
        $genre = factory(Genre::class)->create();

        $response = $this->get(route('api.b1.genres.show', $genre->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}