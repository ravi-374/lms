<?php


namespace Tests\B1\APIs\Permissions;


use App\Models\Member;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use JWTAuth;
use Tests\TestCase;

/**
 * Class MemberAPIPermissionTest
 */
class MemberAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = JWTAuth::fromUser($this->loggedInUserId);
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_can_delete_member_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_members']);

        $member = factory(Member::class)->create();

        $response = $this->deleteJson(route('api.b1.members.destroy', $member->id));

        $this->assertExceptionMessage($response, 'Member deleted successfully.');
    }

    /** @test */
    public function test_not_allow_to_delete_member_without_permission()
    {
        $member = factory(Member::class)->create();

        $response = $this->deleteJson(route('api.b1.members.destroy', $member->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}