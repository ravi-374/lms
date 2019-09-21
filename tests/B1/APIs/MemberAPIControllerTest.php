<?php

namespace Tests\B1\APIs;

use App\Models\Member;
use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

class MemberAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_members()
    {
        $this->mockRepo(self::$member);

        /** @var Member[] $members */
        $members = factory(Member::class, 5)->create();

        $this->memberRepository->expects('all')->andReturn($members);

        $response = $this->getJson(route('api.b1.members.index'));

        $this->assertSuccessDataResponse(
            $response,
            $members->toArray(),
            'Members retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_members()
    {
        /** @var Member[] $members */
        $members = factory(Member::class, 5)->create();

        $response = $this->getJson(route('api.b1.members.index'));
        $take3 = $this->getJson(route('api.b1.members.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.members.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.members.index', ['search' => $members[0]->first_name]));

        $this->assertCount(5, $response->original['data']);
        $this->assertEquals(5, $response->original['totalRecords']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 5);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function test_can_sort_member_records_by_membership_plan_name()
    {
        $plan1 = factory(MembershipPlan::class)->create(['name' => 'Basic']);
        $member1 = factory(Member::class)->create(['membership_plan_id' => $plan1->id]);

        $plan2 = factory(MembershipPlan::class)->create(['name' => 'VIP']);
        $member2 = factory(Member::class)->create(['membership_plan_id' => $plan2->id]);

        $responseAsc = $this->getJson(route('api.b1.members.index', [
                'order_by'  => 'membership_plan_name',
                'direction' => 'asc',
            ]
        ));
        $responseDesc = $this->getJson(route('api.b1.members.index', [
                'order_by'  => 'membership_plan_name',
                'direction' => 'desc',
            ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($plan1->name, $responseAsc[0]['membership_plan']['name']);
        $this->assertEquals($plan2->name, $responseDesc[0]['membership_plan']['name']);
    }

    /** @test */
    public function it_can_create_member()
    {
        $this->mockRepo(self::$member);

        /** @var Member $member */
        $member = factory(Member::class)->make();

        $input = array_merge($member->toArray(), ['password' => 12345678]);

        $this->memberRepository->expects('store')
            ->with($input)
            ->andReturn($member);

        $response = $this->postJson(route('api.b1.members.store'), $input);

        $this->assertSuccessDataResponse($response, $member->toArray(), 'Member saved successfully.');
    }

    /** @test */
    public function it_can_update_member()
    {
        $this->mockRepo(self::$member);

        /** @var Member $member */
        $member = factory(Member::class)->create();
        $updateRecord = factory(Member::class)->make(['id' => $member->id]);

        $this->memberRepository->expects('update')
            ->with($updateRecord->toArray(), $member->id)
            ->andReturn($updateRecord);

        $response = $this->postJson(route('api.b1.members.update', $member->id), $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->getJson(route('api.b1.members.show', $member->id));

        $this->assertSuccessDataResponse(
            $response,
            $member->toArray(),
            'Member retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->deleteJson(route('api.b1.members.destroy', $member->id));

        $this->assertSuccessDataResponse(
            $response,
            $member->toArray(),
            'Member deleted successfully.'
        );
        $this->assertEmpty(Member::find($member->id));
    }

    /** @test */
    public function test_can_activate_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create(['is_active' => false]);

        $response = $this->getJson(route('api.b1.members.update-status', $member->id));

        $this->assertSuccessDataResponse(
            $response,
            $member->fresh()->toArray(),
            'Member updated successfully.'
        );
        $this->assertTrue($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_de_activate_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create(['is_active' => true]);

        $response = $this->getJson(route('api.b1.members.update-status', $member->id));

        $this->assertSuccessDataResponse(
            $response,
            $member->fresh()->toArray(),
            'Member updated successfully.'
        );
        $this->assertFalse($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_search_members_records_by_membership_plan_name()
    {
        /** @var MembershipPlan $membershipPlan1 */
        $membershipPlan1 = factory(MembershipPlan::class)->create(['name' => 'Dynami']);
        /** @var Member $member1 */
        $member1 = factory(Member::class)->create(['membership_plan_id' => $membershipPlan1->id]);

        $membershipPlan2 = factory(MembershipPlan::class)->create();
        /** @var Member $member2 */
        $member2 = factory(Member::class)->create(['membership_plan_id' => $membershipPlan2->id]);

        $response = $this->getJson(route('api.b1.members.index', ['search' => $membershipPlan1->name]));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_remove_member_profile_image()
    {
        $member = factory(Member::class)->create(['image' => 'image.jpg']);

        $response = $this->postJson(route('api.b1.members.remove-image', $member->id));

        $this->assertSuccessMessageResponse($response, 'Member image removed successfully.');
        $this->assertEmpty($member->fresh()->image);
    }
}
