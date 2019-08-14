<?php

namespace Tests\V1;

use App\Models\Country;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class CountryAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_countries()
    {
        $countries = factory(Country::class)->times(5)->create();

        $response = $this->getJson('api/v1/countries');

        $this->assertSuccessDataResponse($response, $countries->toArray(), 'Countries retrieved successfully.');
    }
}