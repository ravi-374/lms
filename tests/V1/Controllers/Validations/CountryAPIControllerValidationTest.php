<?php

namespace Tests\V1\Controllers\Validations;

use App\Models\Country;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CountryAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_can_get_all_countries()
    {
        $countries = factory(Country::class)->times(5)->create();

        $response = $this->getJson('api/v1/countries');

        $this->assertCount(251, $response->original['data'], '246 Default');
    }
}