<?php

namespace Tests\V1\Controllers;

use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class IssuedBookAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $issuedBookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->issuedBookRepo = \Mockery::mock(IssuedBookRepository::class);
        app()->instance(IssuedBookRepository::class, $this->issuedBookRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_book_history()
    {
        $this->mockRepository();

        $member = factory(Member::class)->create();
        $bookItems = factory(IssuedBook::class)
            ->times(5)
            ->create(['member_id' => $member->id]);

        $this->issuedBookRepo->expects('all')
            ->once()
            ->andReturn($bookItems);

        $response = $this->getJson('api/v1/books-history');

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertEquals(5, $response->original['totalRecords']);
    }
}