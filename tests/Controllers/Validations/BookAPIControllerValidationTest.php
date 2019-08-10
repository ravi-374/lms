<?php

namespace Tests\Controllers\Validations;

use App\Models\Book;
use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

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
    public function test_create_book_fails_when_genres_is_not_passed()
    {
        $this->post('api/b1/books/', ['genres' => []])
            ->assertSessionHasErrors(['genres' => 'The genres field is required.']);
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
    public function test_update_book_fails_when_genres_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $this->post('api/b1/books/'.$book->id, ['genres' => []])
            ->assertSessionHasErrors(['genres' => 'The genres field is required.']);
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
        $response = $this->postJson('api/b1/books', $this->prepareBookInputs());

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
    }

    /** @test */
    public function it_can_update_book()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        $response = $this->putJson('api/b1/books/'.$book->id, $this->prepareBookInputs());

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
    }

    /**
     * @param array $input
     *
     * @return array
     */
    public function prepareBookInputs($input = [])
    {
        $genre = factory(Genre::class)->create();

        return array_merge([
            'name'   => $this->faker->name,
            'isbn'   => $this->faker->isbn10,
            'genres' => [$genre->id],
        ], $input);
    }
}
