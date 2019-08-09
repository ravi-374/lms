<?php

namespace Tests\Controllers\Validations;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MemberControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_member_fails_when_first_name_is_not_passed()
    {
        $this->post('api/b1/members', ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_last_name_is_not_passed()
    {
        $this->post('api/b1/members', ['last_name' => ''])
            ->assertSessionHasErrors(['last_name' => 'The last name field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_email_is_not_passed()
    {
        $this->post('api/b1/members', ['email' => ''])
            ->assertSessionHasErrors(['email' => 'The email field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_password_is_not_passed()
    {
        $this->post('api/b1/members', ['password' => ''])
            ->assertSessionHasErrors(['password' => 'The password field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_password_length_is_less_than_six_character()
    {
        $this->post('api/b1/members', ['password' => 12345])
            ->assertSessionHasErrors(['password' => 'The password must be at least 6 characters.']);
    }

    /** @test */
    public function test_create_member_fails_when_membership_plan_id_is_not_passed()
    {
        $this->post('api/b1/members', ['membership_plan_id' => ''])
            ->assertSessionHasErrors(['membership_plan_id' => 'The membership plan id field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_email_is_duplicate()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members', ['email' => $ankit->email])
            ->assertSessionHasErrors(['email' => 'The email has already been taken.']);
    }

    /** @test */
    public function test_update_member_fails_when_first_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members/'.$ankit->id, ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }

    /** @test */
    public function test_update_member_fails_when_last_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members/'.$ankit->id, ['last_name' => ''])
            ->assertSessionHasErrors(['last_name' => 'The last name field is required.']);
    }

    /** @test */
    public function it_can_store_member()
    {
        $fakeMember = factory(Member::class)->make()->toArray();
        $response = $this->postJson('api/b1/members', array_merge($fakeMember, ['password' => $this->faker->password]));

        $this->assertSuccessMessageResponse($response, 'Member saved successfully.');
        $this->assertNotEmpty(Member::whereEmail($fakeMember['email'])->first());
    }

    /** @test */
    public function it_can_update_member()
    {
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->make()->toArray();

        $response = $this->postJson('api/b1/members/'.$member->id, $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email, 'Email should not update');
    }

    /** @test */
    public function test_can_delete_member()
    {
        $member = factory(Member::class)->create();

        $response = $this->deleteJson('api/b1/members/'.$member->id);

        $this->assertSuccessMessageResponse($response, 'Member deleted successfully.');
        $this->assertEmpty(Member::find($member->id));
    }

    /** @test */
    public function test_can_activate_member()
    {
        $member = factory(Member::class)->create(['is_active' => 0]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');

        $this->assertSuccessMessageResponse($response, 'Member has been activated successfully.');
        $this->assertTrue($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_de_activate_member()
    {
        $member = factory(Member::class)->create(['is_active' => 1]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');

        $this->assertSuccessMessageResponse($response, 'Member has been deactivated successfully.');
        $this->assertFalse($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_get_details_of_logged_in_member()
    {
        $response = $this->get('api/v1/member-details');

        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInUserId, $response->original['data']->id);
    }
}