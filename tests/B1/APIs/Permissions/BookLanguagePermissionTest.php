<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\BookLanguage;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use JWTAuth;
use Tests\TestCase;

/**
 * Class BookLanguagePermissionTest
 * @package Tests\B1\APIs\Permissions
 */
class BookLanguagePermissionTest extends TestCase
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
    public function test_not_allow_to_get_book_languages_without_permission()
    {
        $response = $this->getJson(route('api.b1.book-languages.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_book_language_without_permission()
    {
        $fakeBookLanguage = factory(BookLanguage::class)->raw();

        $response = $this->postJson(route('api.b1.book-languages.store'), $fakeBookLanguage);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_book_language_without_permission()
    {
        $bookLanguage = factory(BookLanguage::class)->create();
        $updateBookLanguage = factory(BookLanguage::class)->raw(['id' => $bookLanguage->id]);

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id), $updateBookLanguage);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_book_language_without_permission()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->deleteJson(route('api.b1.book-languages.destroy', $bookLanguage->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_book_languages_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_languages']);
        $response = $this->getJson(route('api.b1.book-languages.index'));

        $this->assertSuccessMessageResponse($response, 'Book Languages retrieved successfully.');
    }

    /** @test */
    public function test_can_create_book_language_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_languages']);
        $fakeBookLanguage = factory(BookLanguage::class)->raw();

        $response = $this->postJson(route('api.b1.book-languages.store'), $fakeBookLanguage);

        $this->assertExceptionMessage($response, 'Book Language saved successfully.');
    }

    /** @test */
    public function test_can_update_book_language_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_languages']);
        $bookLanguage = factory(BookLanguage::class)->create();
        $updateBookLanguage = factory(BookLanguage::class)->raw(['id' => $bookLanguage->id]);

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id), $updateBookLanguage);

        $this->assertExceptionMessage($response, 'Book Language updated successfully.');
    }

    /** @test */
    public function test_can_delete_book_language_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_languages']);
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->deleteJson(route('api.b1.book-languages.destroy', $bookLanguage->id));

        $this->assertExceptionMessage($response, 'Book Language deleted successfully.');
    }
}