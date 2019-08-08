<?php

namespace Tests\Repositories;

use App\Models\Address;
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
        /** @var Member $members */
        $members = factory(Member::class)->times(2)->create();

        $address = factory(Address::class)->create();

        $members[0]->address()->save($address);
        $members[1]->address()->save($address);

        $memberList = $this->memberRepo->all([]);

        $this->assertEquals($members[0]->id, $memberList[1]->id);
        $this->assertEquals($members[1]->id, $memberList[0]->id);

        $this->assertNotEmpty($memberList[0]->address);
    }

    /** @test */
    public function test_can_store_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->make();
        $input = array_merge($member->toArray(), [
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
        $inputs = [
            'first_name' => 'random name',
            'address_1'  => $this->faker->address,
        ];

        $updatedMember = $this->memberRepo->update($inputs, $member->id);

        $this->assertArrayHasKey('id', $updatedMember);
        $this->assertEquals('random name', $updatedMember->first_name);

        $this->assertNotEmpty($updatedMember->address);
    }

    /** @test */
    public function test_can_generate_member_id()
    {
        $generatedMemberId = $this->memberRepo->generateMemberId();

        $this->assertNotEmpty($generatedMemberId);
    }
}