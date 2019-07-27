<?php

namespace Tests;

use App\User;
use Faker\Factory;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /** @var \Faker\Generator */
    public $faker;

    use CreatesApplication;

    public function signInWithDefaultAdminUser()
    {
        $user = factory(User::class)->create();

        return $this->actingAs($user);
    }

    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);

        $this->faker = Factory::create();
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
}
