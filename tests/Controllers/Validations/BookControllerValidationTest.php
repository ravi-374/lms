<?php

namespace Tests\Controllers\Validations;

use App\Models\Book;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_fails_when_name_is_not_passed()
    {
        $this->post('api/b1/books', ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_create_book_fails_when_name_is_duplicate()
    {
        $book = factory(Book::class)->create();

        $this->post('api/b1/books/', ['name' => $book->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function test_create_book_fails_when_isbn_is_not_passed()
    {
        $this->post('api/b1/books/', ['isbn' => ''])
            ->assertSessionHasErrors(['isbn' => 'The isbn field is required.']);
    }

    /** @test */
    public function test_create_book_fails_when_isbn_is_duplicate()
    {
        $isbn = factory(Book::class)->create();

        $this->post('api/b1/books/', ['isbn' => $isbn->isbn])
            ->assertSessionHasErrors(['isbn' => 'The isbn has already been taken.']);
    }

    /** @test */
    public function test_update_book_fails_when_name_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $this->put('api/b1/books/'.$book->id, ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_update_book_fails_when_isbn_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $this->put('api/b1/books/'.$book->id, ['isbn' => ''])
            ->assertSessionHasErrors(['isbn' => 'The isbn field is required.']);
    }

    /** @test */
    public function test_update_book_fails_when_name_is_duplicate()
    {
        $book1 = factory(Book::class)->create();
        $book2 = factory(Book::class)->create();

        $this->put('api/b1/books/'.$book2->id, ['name' => $book1->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function test_update_book_fails_when_isbn_is_duplicate()
    {
        $book1 = factory(Book::class)->create();
        $book2 = factory(Book::class)->create();

        $this->put('api/b1/books/'.$book2->id, ['isbn' => $book1->isbn])
            ->assertSessionHasErrors(['isbn' => 'The isbn has already been taken.']);
    }

    /** @test */
    public function it_can_store_book()
    {
        /** @var Book $book */
        $book = factory(Book::class)->make();

        $response = $this->postJson('api/b1/books', $book->toArray());
        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
    }

    /** @test */
    public function it_can_update_book()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        $response = $this->putJson('api/b1/books/'.$book->id, ['name' => 'Ankit']);
        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
    }
}
