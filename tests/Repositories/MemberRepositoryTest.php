<?php

namespace Tests\Repositories;

use App\Models\Member;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
/**
 * Class MemberRepositoryTest
 * @package Tests\Repositories
 */
class MemberRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var MemberRepository
     */
    private $memberRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->memberRepo = app(MemberRepository::class);
    }

    /** @test */
    public function test_can_get_all_members()
    {
        factory(Member::class)->times(10)->create();

        $members = $this->memberRepo->all();
        $take3 = $this->memberRepo->all([], null, 3);
        $skip4 = $this->memberRepo->all([], 4, 5);

        $this->assertCount(10, $members);
        $this->assertCount(3, $take3);
        $this->assertCount(5, $skip4);
    }

    /** @test */
    public function test_can_store_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->raw();
        $input = array_merge($member, [
            'password'  => 123456,
            'address_1' => $this->faker->address,
        ]);

        $member = $this->memberRepo->store($input);

        $this->assertArrayHasKey('id', $member);
        $this->assertNotEmpty($member->address);
    }

    /** @test */
    public function test_can_update_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->raw(['id' => $member->id]);

        $updatedMember = $this->memberRepo->update($fakeMember, $member->id);

        $this->assertArrayHasKey('id', $updatedMember);
        $this->assertEquals($fakeMember['first_name'], $updatedMember->fresh()->first_name);
    }

    /** @test */
    public function test_can_generate_member_id()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();
        $generatedMemberId = $this->memberRepo->generateMemberId();

        $this->assertNotEmpty($generatedMemberId);
        $this->assertNotEquals($member->member_id, $generatedMemberId);
    }
}