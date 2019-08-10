<?php

namespace Tests\Controllers;

use App\Models\BookItem;
use App\Models\BookLanguage;
use App\Repositories\BookLanguageRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class BookLanguageAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $bookLanguageRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
        $this->withoutMiddleware($this->skipMiddleware());
    }

    private function mockRepository()
    {
        $this->bookLanguageRepo = \Mockery::mock(BookLanguageRepository::class);
        app()->instance(BookLanguageRepository::class, $this->bookLanguageRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_book_languages()
    {
        $this->mockRepository();

        /** @var BookLanguage $bookLanguages */
        $bookLanguages = factory(BookLanguage::class)->times(5)->create();

        $this->bookLanguageRepo->shouldReceive('all')
            ->once()
            ->andReturn($bookLanguages);

        $response = $this->getJson('api/b1/book-languages');

        $this->assertSuccessDataResponse($response, $bookLanguages->toArray(),
            'Book Languages retrieved successfully.');
    }

    /** @test */
    public function it_can_store_book_language()
    {
        $this->mockRepository();

        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->make();

        $this->bookLanguageRepo->shouldReceive('create')
            ->once()
            ->with($bookLanguage->toArray())
            ->andReturn($bookLanguage);

        $response = $this->postJson('api/b1/book-languages', $bookLanguage->toArray());

        $this->assertSuccessDataResponse($response, $bookLanguage->toArray(), 'Book Language saved successfully.');
    }

    /** @test */
    public function it_can_update_book_language()
    {
        $this->mockRepository();

        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();
        $fakeBookLanguage = factory(BookLanguage::class)->make();

        $this->bookLanguageRepo->shouldReceive('update')
            ->once()
            ->with($fakeBookLanguage->toArray(), $bookLanguage->id)
            ->andReturn($fakeBookLanguage);

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage->id, $fakeBookLanguage->toArray());

        $this->assertSuccessDataResponse($response, $fakeBookLanguage->toArray(),
            'Book Language updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_book_language()
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->getJson('api/b1/book-languages/'.$bookLanguage->id);

        $this->assertSuccessDataResponse($response, $bookLanguage->toArray(), 'Book Language retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_book_language()
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->deleteJson("api/b1/book-languages/$bookLanguage->id");

        $this->assertSuccessDataResponse($response, $bookLanguage->toArray(), 'Book Language deleted successfully.');
        $this->assertEmpty(BookLanguage::find($bookLanguage->id));
    }

    /** @test */
    public function test_unable_to_delete_book_language_when_its_used_in_one_or_more_book_item()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->deleteJson("api/b1/book-languages/$bookItem->language_id");

        $this->assertExceptionMessage($response,
            'Book Language can not be delete, it is used in one or more book items.');
    }
}