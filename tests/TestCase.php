<?php

namespace Tests;

use App\Models\Member;
use App\User;
use Faker\Factory;
use Illuminate\Foundation\Testing\TestResponse;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /** @var \Faker\Generator */
    public $faker;

    public $loggedInUserId;
    public $loggedInMemberId;

    public function signInWithDefaultAdminUser()
    {
        $user = User::first();
        $this->loggedInUserId = $user->id;

        return $this->actingAs($user);
    }

    public function signInWithMember()
    {
        $member = factory(Member::class)->create();
        $this->loggedInMemberId = $member->id;

        return $this->actingAs($member);
    }

    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);

        $this->faker = Factory::create();
    }

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
    }

    public function skipMiddleware()
    {
        return [
            \Illuminate\Auth\Middleware\Authenticate::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \App\Http\Middleware\UserAuth::class,
            \Zizaco\Entrust\Middleware\EntrustRole::class,
            \Zizaco\Entrust\Middleware\EntrustPermission::class,
        ];
    }

    public function assertSuccessMessageResponse(TestResponse $response, string $message)
    {
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => $message,
            ]);
    }

    public function assertSuccessDataResponse(TestResponse $response, array $data, string $message)
    {
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => $message,
                'data'    => $data,
            ]);
    }

    public function assertExceptionMessage(TestResponse $response, string $message)
    {
        $this->assertEquals($message, $response->exception->getMessage());
    }

    public function assertErrorMessageResponse(TestResponse $response, string $message)
    {
        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => $message,
            ]);
    }
}
