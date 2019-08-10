<?php

namespace Tests\Controllers\Validations;

use App\Models\BookLanguage;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookLanguageAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_language_fails_when_language_name_is_not_passed()
    {
        $this->post('api/b1/book-languages', ['language_name' => ''])
            ->assertSessionHasErrors(['language_name' => 'The language name field is required.']);
    }

    /** @test */
    public function test_create_book_language_fails_when_language_name_is_duplicate()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $this->post('api/b1/book-languages/', ['language_name' => $bookLanguage->language_name])
            ->assertSessionHasErrors(['language_name' => 'The language name has already been taken.']);
    }

    /** @test */
    public function test_create_book_language_fails_when_language_code_is_not_passed()
    {
        $this->post('api/b1/book-languages', ['language_code' => ''])
            ->assertSessionHasErrors(['language_code' => 'The language code field is required.']);
    }

    /** @test */
    public function test_create_book_language_fails_when_language_code_is_duplicate()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $this->post('api/b1/book-languages/', ['language_code' => $bookLanguage->language_code])
            ->assertSessionHasErrors(['language_code' => 'The language code has already been taken.']);
    }

    /** @test */
    public function test_update_book_language_fails_when_language_name_is_not_passed()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $this->put('api/b1/book-languages/'.$bookLanguage->id, ['language_name' => ''])
            ->assertSessionHasErrors(['language_name' => 'The language name field is required.']);
    }

    /** @test */
    public function test_update_book_language_fails_when_language_name_is_duplicate()
    {
        $bookLanguage1 = factory(BookLanguage::class)->create();
        $bookLanguage2 = factory(BookLanguage::class)->create();

        $this->put('api/b1/book-languages/'.$bookLanguage2->id, ['language_name' => $bookLanguage1->language_name])
            ->assertSessionHasErrors(['language_name' => 'The language name has already been taken.']);
    }

    /** @test */
    public function test_update_book_language_fails_when_language_code_is_not_passed()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $this->put('api/b1/book-languages/'.$bookLanguage->id, ['language_code' => ''])
            ->assertSessionHasErrors(['language_code' => 'The language code field is required.']);
    }

    /** @test */
    public function test_update_book_language_fails_when_language_code_is_duplicate()
    {
        $bookLanguage1 = factory(BookLanguage::class)->create();
        $bookLanguage2 = factory(BookLanguage::class)->create();

        $this->put('api/b1/book-languages/'.$bookLanguage2->id, ['language_code' => $bookLanguage1->language_code])
            ->assertSessionHasErrors(['language_code' => 'The language code has already been taken.']);
    }

    /** @test */
    public function it_can_store_book_language()
    {
        $fakeBookLanguage = factory(BookLanguage::class)->make()->toArray();

        $response = $this->postJson('api/b1/book-languages', $fakeBookLanguage);

        $this->assertSuccessMessageResponse($response, 'Book Language saved successfully.');
        $this->assertNotEmpty(BookLanguage::where('language_name', $fakeBookLanguage['language_name'])->first());
    }

    /** @test */
    public function it_can_update_book_language()
    {
        $bookLanguage = factory(BookLanguage::class)->create();
        $fakeBookLanguage = factory(BookLanguage::class)->make()->toArray();

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage->id, $fakeBookLanguage);

        $this->assertSuccessMessageResponse($response, 'Book Language updated successfully.');
        $this->assertEquals($fakeBookLanguage['language_name'], $bookLanguage->fresh()->language_name);
    }

    /** @test */
    public function it_can_delete_book_language()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->deleteJson('api/b1/book-languages/'.$bookLanguage->id);

        $this->assertSuccessMessageResponse($response, 'Book Language deleted successfully.');
        $this->assertEmpty(BookLanguage::where('language_name', $bookLanguage->language_name)->first());
    }
}