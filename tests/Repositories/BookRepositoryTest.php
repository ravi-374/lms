<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\BookLanguage;
use App\Models\Tag;
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

    public function setUp(): void
    {
        parent::setUp();

        $this->bookRepo = app(BookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_books()
    {
        /** @var Book $books */
        $books = factory(Book::class)->times(5)->create();

        $allBooks = $this->bookRepo->all();
        $take3 = $this->bookRepo->all([], null, 3);
        $skip4 = $this->bookRepo->all([], 4, 5);

        $this->assertCount(5, $allBooks);
        $this->assertCount(3, $take3);
        $this->assertCount(1, $skip4);
    }

    /** @test */
    public function it_can_store_book()
    {
        $fakeBook = factory(Book::class)->make()->toArray();

        $bookResult = $this->bookRepo->store($fakeBook);

        $this->assertNotEmpty($bookResult);
        $this->assertEquals($fakeBook['name'], $bookResult->name);
    }

    /** @test */
    public function it_can_update_book()
    {
        $book = factory(Book::class)->create();
        $fakeBook = factory(Book::class)->make()->toArray();

        $result = $this->bookRepo->update($fakeBook, $book->id)->toArray();

        $this->assertNotEmpty($result);
        $this->assertEquals($fakeBook['name'], $book->fresh()->name);
        $this->assertEquals($fakeBook['isbn'], $book->fresh()->isbn);
    }

    /** @test */
    public function test_can_create_book_items()
    {
        $book = factory(Book::class)->create();

        $inputs[] = factory(BookItem::class)->make()->toArray();
        $inputs[] = factory(BookItem::class)->make()->toArray();

        $result = $this->bookRepo->createOrUpdateBookItems($book, $inputs);

        $this->assertTrue($result);

        $book = Book::with('items')->findOrFail($book->id);
        $this->assertCount(2, $book->items);
        $this->assertEquals($inputs[0]['book_code'], $book->items[0]->book_code);
        $this->assertEquals($inputs[1]['book_code'], $book->items[1]->book_code);
    }

    /** @test */
    public function it_can_update_book_items()
    {
        $book = factory(Book::class)->create();
        $bookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        $inputs[] = factory(BookItem::class)->make(['book_id' => $book->id, 'id' => $bookItem->id])->toArray();

        $result = $this->bookRepo->createOrUpdateBookItems($book, $inputs);
        $this->assertTrue($result);

        $book = Book::with('items')->findOrFail($book->id);
        $this->assertCount(1, $book->items);
        $this->assertEquals($inputs[0]['price'], $book->items[0]->price);
    }

    /** @test */
    public function test_can_update_book_items_by_deleting_old_one()
    {
        $book = factory(Book::class)->create();
        $oldBookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        $inputs[] = factory(BookItem::class)->make()->toArray();

        $result = $this->bookRepo->createOrUpdateBookItems($book, $inputs);
        $this->assertTrue($result);

        $book = Book::with('items')->findOrFail($book->id);
        $this->assertCount(1, $book->items, 'Old item was deleted.');
    }

    /** @test */
    public function test_can_generate_unique_book_code()
    {
        $bookCode = $this->bookRepo->generateUniqueBookCode();
        $bookItem = factory(BookItem::class)->create(['book_code' => $bookCode]);

        $uniqueBookCode = $this->bookRepo->generateUniqueBookCode();

        $this->assertNotEmpty($uniqueBookCode);
        $this->assertNotEquals($bookCode, $uniqueBookCode);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage  Tag not found
     */
    public function it_can_not_store_book_with_non_existing_tag()
    {
        $input['tags'] = [999];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage  Genre not found
     */
    public function it_can_not_store_book_with_non_existing_genres()
    {
        $tag = factory(Tag::class)->create();

        $input['tags'] = [$tag->id];
        $input['genres'] = [999];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException App\Exceptions\MissingPropertyException
     * @expectedExceptionMessage  Language is required.
     */
    public function test_can_not_store_book_when_book_item_does_not_have_language()
    {
        $input['items'] = ['language_id' => null];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Invalid Book Format.
     */
    public function it_can_not_store_book_with_invalid_book_item_format()
    {
        /** @var BookItem $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $input['items'] = [['language_id' => $bookLanguage->id, 'format' => 10]];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Please enter book item price.
     */
    public function it_can_not_store_book_without_book_item_price()
    {
        /** @var BookItem $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $input['items'] = [['language_id' => $bookLanguage->id, 'price' => null]];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book code must be 8 character long.
     */
    public function it_can_not_store_book_when_book_item_code_is_more_than_eight_character()
    {
        /** @var BookItem $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $input['items'] = [['language_id' => $bookLanguage->id, 'price' => 100, 'book_code' => 'SXBFHYEDYEL']];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book code must be 8 character long.
     */
    public function it_can_not_store_book_when_book_item_code_is_less_than_eight_character()
    {
        /** @var BookItem $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $input['items'] = [['language_id' => $bookLanguage->id, 'price' => 100, 'book_code' => 'SXBFHY']];

        $this->bookRepo->validateInput($input);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Given book code is already exist.
     */
    public function it_can_not_store_book_when_book_item_code_is_already_exist()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $input['items'] = [
            [
                'language_id' => $bookItem->language_id,
                'price'       => 100,
                'book_code'   => $bookItem->book_code,
            ],
        ];

        $this->bookRepo->validateInput($input);
    }
}
