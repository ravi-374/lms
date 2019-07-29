<?php

namespace Tests\Controllers\Validations;

use App\Models\Member;
use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
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
        $response = $this->postJson('api/b1/members', $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member saved successfully.');
        $this->assertEmpty(Member::whereEmail($fakeMember['email'])->first());
    }

    /** @test */
    public function it_can_update_member()
    {
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->make()->toArray();
        $response = $this->postJson('api/b1/members/'.$member->id, $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email);
    }
}