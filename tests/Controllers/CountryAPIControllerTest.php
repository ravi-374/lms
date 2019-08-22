<?php

namespace Tests\Controllers;

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

        $response = $this->getJson('api/b1/countries');

        $this->assertSuccessDataResponse($response, $countries->toArray(), 'Countries retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_countries()
    {
        $countries = factory(Country::class)->times(5)->create();

        $response = $this->getJson('api/b1/countries');
        $searchByName = $this->getJson('api/b1/countries?search='.$countries[0]->name);
        $take3 = $this->getJson('api/b1/countries?limit=3');
        $skip2 = $this->getJson('api/b1/countries?skip=2&limit=2');

        $this->assertCount(251, $response->original['data'], '246 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertCount(1, $search);
        $this->assertTrue(count($search) > 0 && count($search) < 5, 'Must return at lease one Country');
    }
}