<?php

namespace Tests\Models;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MemberTest
 */
class MemberTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function test_return_member_logo_path()
    {
        $member = factory(Member::class)->create(['image' => $this->faker->imageUrl()]);

        $member = Member::whereId($member->id)->first();

        $this->assertNotEmpty($member->image_path);
    }
}
