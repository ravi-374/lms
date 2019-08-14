<?php

namespace Tests\V1\Controllers;

use App\Models\Member;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class MemberAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $memberRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->memberRepo = \Mockery::mock(MemberRepository::class);
        app()->instance(MemberRepository::class, $this->memberRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function it_can_update_member_profile()
    {
        $this->mockRepository();

        $updateRecord = factory(Member::class)->make(['id' => $this->loggedInUserId]);

        $this->memberRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $this->loggedInUserId)
            ->andReturn($updateRecord);

        $response = $this->postJson('api/b1/update-member-profile', $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member profile updated successfully.');
    }
}