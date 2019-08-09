<?php

namespace Tests\Controllers\Validations;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
use App\Models\Tag;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookAPIControllerValidationTest extends TestCase
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
    public function it_can_not_store_book_with_non_existing_tag()
    {
        $input = array_merge($this->prepareBookInputs(), ['tags' => [999]]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Tag not found.');
    }

    /** @test */
    public function it_can_not_store_book_with_non_existing_genres()
    {
        $tag = factory(Tag::class)->create();

        $input = array_merge($this->prepareBookInputs(['tags' => [$tag->id]]), ['genres' => [999]]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Genre not found.');
    }

    /** @test */
    public function it_can_not_store_book_with_empty_book_item_language_id()
    {
        $input = array_merge($this->prepareBookInputs(), ['items' => ['language_id' => null]]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Language is required.');
    }

    /** @test */
    public function it_can_not_store_book_with_invalid_book_item_format()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->make();

        $input = array_merge($this->prepareBookInputs(), [
            'items' =>
                [
                    [
                        'language_id' => $bookItem->language_id,
                        'format'      => 10,
                    ],
                ],
        ]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Invalid Book Format.');
    }

    /** @test */
    public function it_can_not_store_book_without_book_item_price()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->make();

        $input = array_merge($this->prepareBookInputs(), [
            'items' =>
                [
                    [
                        'language_id' => $bookItem->language_id,
                        'format'      => BookItem::FORMAT_HARDCOVER,
                        'price'       => null,
                    ],
                ],
        ]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Please enter book item price.');
    }

    /** @test */
    public function it_can_not_store_book_when_book_item_code_is_more_than_eight_character()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->make();

        $input = array_merge($this->prepareBookInputs(), [
            'items' =>
                [
                    [
                        'language_id' => $bookItem->language_id,
                        'format'      => BookItem::FORMAT_HARDCOVER,
                        'price'       => 100,
                        'book_code'   => 'too many character',
                    ],
                ],
        ]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Book code must be 8 character long.');
    }

    /** @test */
    public function it_can_not_store_book_when_book_item_code_is_less_than_eight_character()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->make();

        $input = array_merge($this->prepareBookInputs(), [
            'items' =>
                [
                    [
                        'language_id' => $bookItem->language_id,
                        'format'      => BookItem::FORMAT_HARDCOVER,
                        'price'       => 100,
                        'book_code'   => 'small',
                    ],
                ],
        ]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Book code must be 8 character long.');
    }

    /** @test */
    public function it_can_not_store_book_when_book_item_code_is_already_exist()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create(['book_code' => 'rndm_txt']);

        $input = array_merge($this->prepareBookInputs(), [
            'items' =>
                [
                    [
                        'language_id' => $bookItem->language_id,
                        'format'      => BookItem::FORMAT_HARDCOVER,
                        'price'       => 100,
                        'book_code'   => $bookItem->book_code,
                    ],
                ],
        ]);

        $response = $this->postJson('api/b1/books', $input);

        $this->assertExceptionMessage($response, 'Given book code is already exist.');
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

    /** @test */
    public function it_can_not_update_book_with_non_existing_tag()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        $input = array_merge($this->prepareBookInputs(), ['tags' => [999]]);

        $response = $this->putJson('api/b1/books/'.$book->id, $input);

        $this->assertExceptionMessage($response, 'Tag not found.');
    }

    /** @test */
    public function it_can_not_update_book_with_non_existing_genres()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        $tag = factory(Tag::class)->create();

        $input = array_merge($this->prepareBookInputs(['tags' => [$tag->id]]), ['genres' => [999]]);

        $response = $this->putJson('api/b1/books/'.$book->id, $input);

        $this->assertExceptionMessage($response, 'Genre not found.');
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
