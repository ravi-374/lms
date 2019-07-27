<?php

namespace Tests\Controllers\Validations;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MemberControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();

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
        $vishal = factory(Member::class)->create();

        $this->post('api/b1/members', ['email' => $vishal->email])
            ->assertSessionHasErrors(['email' => 'The email has already been taken.']);
    }

    /** @test */
    public function test_update_member_fails_when_first_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->put('api/b1/members/'.$ankit->id, ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }

    /** @test */
    public function test_update_member_fails_when_last_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->put('api/b1/members/'.$ankit->id, ['last_name' => ''])
            ->assertSessionHasErrors(['last_name' => 'The last name field is required.']);
    }

    /** @test */
    public function test_update_member_fails_when_email_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->put('api/b1/members/'.$ankit->id, ['email' => ''])
            ->assertSessionHasErrors(['email' => 'The email field is required.']);
    }

    /** @test */
    public function test_update_member_fails_when_password_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->put('api/b1/members/'.$ankit->id, ['password' => ''])
            ->assertSessionHasErrors(['password' => 'The password field is required.']);
    }

    /** @test */
    public function test_update_email_fails_when_email_is_duplicate()
    {
        $ankit = factory(Member::class)->create();
        $vishal = factory(Member::class)->create();

        $this->put('api/b1/members/'.$vishal->id, ['email' => $vishal->email])
            ->assertSessionHasErrors(['email' => 'The email already been taken.']);
    }
}
