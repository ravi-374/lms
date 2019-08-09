<?php

namespace Tests\Controllers;

use App\Models\BookItem;
use App\Models\Publisher;
use App\Repositories\PublisherRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class PublisherAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $publisherRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->publisherRepo = \Mockery::mock(PublisherRepository::class);
        app()->instance(PublisherRepository::class, $this->publisherRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_publishers()
    {
        $this->mockRepository();

        $publishers = factory(Publisher::class)->times(5)->create();

        $this->publisherRepo->shouldReceive('all')
            ->once()
            ->andReturn($publishers);

        $response = $this->getJson('api/b1/publishers');

        $this->assertSuccessDataResponse($response, $publishers->toArray(), 'Publishers retrieved successfully.');
    }

    /** @test */
    public function it_can_store_publisher()
    {
        $this->mockRepository();

        /** @var Publisher $publisher */
        $publisher = factory(Publisher::class)->make();

        $this->publisherRepo->shouldReceive('create')
            ->once()
            ->with($publisher->toArray())
            ->andReturn($publisher);

        $response = $this->postJson('api/b1/publishers', $publisher->toArray());

        $this->assertSuccessDataResponse($response, $publisher->toArray(), 'Publisher saved successfully.');
    }

    /** @test */
    public function it_can_update_publisher()
    {
        $this->mockRepository();

        /** @var Publisher $publisher */
        $publisher = factory(Publisher::class)->create();
        $updateRecord = factory(Publisher::class)->make();

        $this->publisherRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $publisher->id)
            ->andReturn($updateRecord);

        $response = $this->putJson('api/b1/publishers/'.$publisher->id, $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Publisher updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_publisher()
    {
        /** @var Publisher $publisher */
        $publisher = factory(Publisher::class)->create();

        $response = $this->getJson("api/b1/publishers/$publisher->id");

        $this->assertSuccessDataResponse($response, $publisher->toArray(), 'Publisher retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_publisher()
    {
        /** @var Publisher $publisher */
        $publisher = factory(Publisher::class)->create();

        $response = $this->deleteJson("api/b1/publishers/$publisher->id");

        $this->assertSuccessDataResponse($response, $publisher->toArray(), 'Publisher deleted successfully.');
        $this->assertEmpty(Publisher::find($publisher->id));
    }

    /** @test */
    public function test_unable_to_delete_publisher_when_its_used_in_one_or_more_book_items()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->deleteJson("api/b1/publishers/$bookItem->publisher_id");

        $this->assertExceptionMessage($response, 'Publisher can not be delete, it is used in one or more book items.');
    }
}