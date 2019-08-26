<?php

namespace Tests\Controllers;

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

        $this->bookLanguageRepo->expects('all')
            ->once()
            ->andReturn($bookLanguages);

        $response = $this->getJson('api/b1/book-languages');

        $this->assertSuccessDataResponse(
            $response, $bookLanguages->toArray(), 'Book Languages retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_book_languages()
    {
        /** @var BookLanguage[] $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->times(5)->create();

        $response = $this->getJson('api/b1/book-languages');
        $take3 = $this->getJson('api/b1/book-languages?limit=3');
        $skip2 = $this->getJson('api/b1/book-languages?skip=2&limit=2');
        $search = $this->getJson('api/b1/book-languages?search='.$bookLanguage[0]->language_name);

        $this->assertCount(23, $response->original['data'], '18 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $search->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 23);
    }

    /** @test */
    public function it_can_create_book_language()
    {
        $this->mockRepository();

        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->make();

        $this->bookLanguageRepo->expects('create')
            ->once()
            ->with($bookLanguage->toArray())
            ->andReturn($bookLanguage);

        $response = $this->postJson('api/b1/book-languages', $bookLanguage->toArray());

        $this->assertSuccessDataResponse(
            $response, $bookLanguage->toArray(), 'Book Language saved successfully.'
        );
    }

    /** @test */
    public function it_can_update_book_language()
    {
        $this->mockRepository();

        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();
        $fakeBookLanguage = factory(BookLanguage::class)->make(['id' => $bookLanguage->id]);

        $this->bookLanguageRepo->expects('update')
            ->once()
            ->with($fakeBookLanguage->toArray(), $bookLanguage->id)
            ->andReturn($fakeBookLanguage);

        $response = $this->putJson('api/b1/book-languages/'.$bookLanguage->id, $fakeBookLanguage->toArray());

        $this->assertSuccessDataResponse(
            $response, $fakeBookLanguage->toArray(), 'Book Language updated successfully.'
        );
    }

    /** @test */
    public function it_can_retrieve_book_language()
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create();

        $response = $this->getJson('api/b1/book-languages/'.$bookLanguage->id);

        $this->assertSuccessDataResponse(
            $response, $bookLanguage->toArray(), 'Book Language retrieved successfully.'
        );
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