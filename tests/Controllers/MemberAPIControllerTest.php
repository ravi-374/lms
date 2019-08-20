<?php

namespace Tests\Controllers;

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
    public function test_can_get_all_members()
    {
        $this->mockRepository();

        $members = factory(Member::class)->times(5)->create();

        $this->memberRepo->shouldReceive('all')
            ->once()
            ->andReturn($members);

        $response = $this->getJson('api/b1/members');

        $this->assertSuccessDataResponse(
            $response,
            $members->toArray(),
            'Members retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_get_members()
    {
        /** @var Member $members */
        $members = factory(Member::class)->times(5)->create();

        $response = $this->getJson('api/b1/members');
        $search = $this->getJson('api/b1/members?search='.$members[0]->first_name);
        $take3 = $this->getJson('api/b1/members?limit=3');
        $skip2 = $this->getJson('api/b1/members?skip=2&limit=2');

        $response = $response->original['data'];
        $this->assertCount(5, $response);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $this->assertCount(1, $search->original['data']);
        $this->assertEquals($members[0]->first_name, $search->original['data'][0]['first_name']);
    }

    /** @test */
    public function it_can_create_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->make();

        $input = array_merge($member->toArray(), ['password' => 12345678]);

        $this->memberRepo->shouldReceive('store')
            ->once()
            ->with($input)
            ->andReturn($member);

        $response = $this->postJson('api/b1/members', $input);

        $this->assertSuccessDataResponse($response, $member->toArray(), 'Member saved successfully.');
    }

    /** @test */
    public function it_can_update_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->create();
        $updateRecord = factory(Member::class)->make(['id' => $member->id]);
        unset($updateRecord['email']);

        $this->memberRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $member->id)
            ->andReturn($updateRecord);

        $response = $this->postJson('api/b1/members/'.$member->id, $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->getJson("api/b1/members/$member->id");

        $this->assertSuccessDataResponse(
            $response, $member->toArray(), 'Member retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->deleteJson("api/b1/members/$member->id");

        $this->assertSuccessDataResponse(
            $response, $member->toArray(), 'Member deleted successfully.'
        );
        $this->assertEmpty(Member::find($member->id));
    }

    /** @test */
    public function test_can_activate_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create(['is_active' => false]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');

        $this->assertSuccessDataResponse($response, $member->fresh()->toArray(), 'Member updated successfully.');
        $this->assertTrue($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_de_activate_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create(['is_active' => true]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');

        $this->assertSuccessDataResponse($response, $member->fresh()->toArray(), 'Member updated successfully.');
        $this->assertFalse($member->fresh()->is_active);
    }
}