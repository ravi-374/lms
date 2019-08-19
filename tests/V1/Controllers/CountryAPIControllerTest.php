<?php

namespace Tests\V1\Controllers;

use App\Models\Country;
use App\Repositories\CountryRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class CountryAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $countryRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->countryRepo = \Mockery::mock(CountryRepository::class);
        app()->instance(CountryRepository::class, $this->countryRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_country_list()
    {
        $this->mockRepository();

        /** @var Country $countries */
        $countries = factory(Country::class)->times(2)->create();

        $this->countryRepo->shouldReceive('all')
            ->once()
            ->andReturn($countries);

        $response = $this->getJson('api/v1/countries');

        $this->assertSuccessDataResponse($response, $countries->toArray(), 'Countries retrieve successfully.');
    }
}