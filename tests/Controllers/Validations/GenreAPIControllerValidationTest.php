<?php

namespace Tests\Controllers\Validations;

use App\Models\Book;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class GenreAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_fails_when_genre_is_not_passed()
    {
        $this->post('api/b1/books/', ['genre' => ''])
            ->assertSessionHasErrors(['genre' => 'The genre field is required.']);
    }

    /** @test */
    public function test_update_book_fails_when_genre_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $this->put('api/b1/books/'.$book->id, ['genre' => ''])
            ->assertSessionHasErrors(['genre' => 'The genre field is required.']);
    }
}
