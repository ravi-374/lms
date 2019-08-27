<?php

namespace Tests\B1\APIs\Validations;

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
    }

    /** @test */
    public function test_create_book_fails_when_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/books', ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_book_fails_when_name_is_duplicate()
    {
        $book = factory(Book::class)->create();

        $response = $this->postJson('api/b1/books/', ['name' => $book->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_create_book_fails_when_isbn_is_not_passed()
    {
        $response = $this->postJson('api/b1/books/', ['name' => $this->faker->name, 'isbn' => '']);

        $this->assertExceptionMessage($response, 'The isbn field is required.');
    }

    /** @test */
    public function test_create_book_fails_when_isbn_is_duplicate()
    {
        $isbn = factory(Book::class)->create();

        $response = $this->postJson('api/b1/books/', ['name' => $this->faker->name, 'isbn' => $isbn->isbn]);

        $this->assertExceptionMessage($response, 'The isbn has already been taken.');
    }

    /** @test */
    public function test_create_book_fails_when_genres_is_not_passed()
    {
        $response = $this->postJson('api/b1/books/',
            ['name' => $this->faker->name, 'isbn' => $this->faker->isbn13, 'genres' => []]
        );

        $this->assertExceptionMessage($response, 'The genres field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_name_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $response = $this->putJson('api/b1/books/'.$book->id, ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_isbn_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $response = $this->putJson('api/b1/books/'.$book->id, ['name' => $this->faker->name, 'isbn' => '']);

        $this->assertExceptionMessage($response, 'The isbn field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_genres_is_not_passed()
    {
        $book = factory(Book::class)->create();

        $response = $this->postJson('api/b1/books/'.$book->id,
            ['name' => $this->faker->name, 'isbn' => $this->faker->isbn13, 'genres' => []]
        );

        $this->assertExceptionMessage($response, 'The genres field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_name_is_duplicate()
    {
        $book1 = factory(Book::class)->create();
        $book2 = factory(Book::class)->create();

        $response = $this->putJson('api/b1/books/'.$book2->id, ['name' => $book1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_book_fails_when_isbn_is_duplicate()
    {
        $book1 = factory(Book::class)->create();
        $book2 = factory(Book::class)->create();

        $response = $this->putJson('api/b1/books/'.$book2->id, ['name' => $this->faker->name, 'isbn' => $book1->isbn]);

        $this->assertExceptionMessage($response, 'The isbn has already been taken.');
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
