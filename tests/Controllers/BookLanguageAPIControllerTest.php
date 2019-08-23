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
}