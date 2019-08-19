<?php

namespace Tests\Controllers\Validations;

use App\Models\BookItem;
use App\Models\BookLanguage;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookLanguageAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_language_fails_when_language_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/book-languages', ['language_name' => '']);

        $this->assertExceptionMessage($response, 'The language name field is required.');
    }

    /** @test */
    public function test_create_book_language_fails_when_language_name_is_duplicate()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->postJson('api/b1/book-languages/', ['language_name' => $bookLanguage->language_name]);

        $this->assertExceptionMessage($response, 'The language name has already been taken.');
    }

    /** @test */
    public function test_create_book_language_fails_when_language_code_is_not_passed()
    {
        $response = $this->postJson('api/b1/book-languages',
            ['language_name' => $this->faker->name, 'language_code' => '']
        );

        $this->assertExceptionMessage($response, 'The language code field is required.');
    }

    /** @test */
    public function test_create_book_language_fails_when_language_code_is_duplicate()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->postJson('api/b1/book-languages/',
            ['language_name' => $this->faker->name, 'language_code' => $bookLanguage->language_code]);

        $this->assertExceptionMessage($response, 'The language code has already been taken.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_name_is_not_passed()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage->id, ['language_name' => '']);

        $this->assertExceptionMessage($response, 'The language name field is required.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_name_is_duplicate()
    {
        $bookLanguage1 = factory(BookLanguage::class)->create();
        $bookLanguage2 = factory(BookLanguage::class)->create();

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage2->id,
            ['language_name' => $bookLanguage1->language_name]
        );

        $this->assertExceptionMessage($response, 'The language name has already been taken.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_code_is_not_passed()
    {
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage->id,
            ['language_name' => $this->faker->name, 'language_code' => '']
        );

        $this->assertExceptionMessage($response, 'The language code field is required.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_code_is_duplicate()
    {
        $bookLanguage1 = factory(BookLanguage::class)->create();
        $bookLanguage2 = factory(BookLanguage::class)->create();

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage2->id,
            ['language_name' => $this->faker->name, 'language_code' => $bookLanguage1->language_code]
        );

        $this->assertExceptionMessage($response, 'The language code has already been taken.');
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

    /** @test */
    public function test_can_not_delete_book_language_when_book_is_used_one_more_book_items()
    {
        $bookLanguage = factory(BookLanguage::class)->create();
        $bookItem = factory(BookItem::class)->create(['language_id' => $bookLanguage->id]);

        $response = $this->deleteJson('api/b1/book-languages/'.$bookLanguage->id);

        $this->assertExceptionMessage($response,
            'Book Language can not be delete, it is used in one or more book items.');
    }
}