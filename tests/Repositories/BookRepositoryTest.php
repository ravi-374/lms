<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\BookLanguage;
use App\Models\Publisher;
use App\Repositories\BookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRepositoryTest.
 */
class BookRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var BookRepository */
    protected $bookRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->bookRepo = app(BookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test
     */
    public function it_can_store_book()
    {
        $input = [
            'name' => $this->faker->name,
            'isbn' => $this->faker->isbn10,
        ];

        $bookResult = $this->bookRepo->store($input)->toArray();

        $this->assertArrayHasKey('id', $bookResult);
        $this->assertEquals($input['name'], $bookResult['name']);
    }

    /** @test */
    public function it_can_update_book()
    {
        $book = factory(Book::class)->create();
        $inputs = [
            'name' => $this->faker->name,
            'isbn' => $this->faker->isbn10,
        ];

        $book = $this->bookRepo->update($inputs, $book->id)->toArray();

        $this->assertArrayHasKey('id', $book);
        $this->assertEquals($inputs['name'], $book['name']);
        $this->assertEquals($inputs['isbn'], $book['isbn']);
    }

    /** @test */
    public function test_can_create_book()
    {
        $book = factory(Book::class)->create([
            'name' => $this->faker->name,
            'isbn' => $this->faker->isbn10,
        ]);
        $language = factory(BookLanguage::class)->create();
        $publisher = factory(Publisher::class)->create();
        $inputs[] = factory(BookItem::class)->make([
            'book_id'      => $this->faker->uuid,
            'book_code'    => $this->faker->word,
            'price'        => 15,
            'language_id'  => $language->id,
            'publisher_id' => $publisher->id,
            'format'       => 1,
        ]);

        $createBookItems = $this->bookRepo->createOrUpdateBookItems($book, $inputs);

        $this->assertEquals($book['book_id'], $createBookItems['book_id']);
    }

    /** @test */
    public function it_can_add_book_item()
    {
        $book = factory(Book::class)->create([
            'name' => $this->faker->name,
            'isbn' => $this->faker->isbn10,
        ]);
        $language = factory(BookLanguage::class)->create([
            'language_name' => $this->faker->name,
            'language_code' => $this->faker->word,
        ]);
        $publisher = factory(Publisher::class)->create();
        $inputs[] = factory(BookItem::class)->make([
            'book_id'      => $this->faker->uuid,
            'book_code'    => 12345678,
            'price'        => 15,
            'language_id'  => $language->id,
            'publisher_id' => $publisher->id,
            'format'       => 1,
        ]);

        $bookItem = $this->bookRepo->addBookItems($book,$inputs);

        $this->assertEquals($book['book_id'], $bookItem['book_id']);
    }
}
