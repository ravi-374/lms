<?php

namespace Tests\B1\APIs;

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

        /** @var Country[] $countries */
        $countries = factory(Country::class)->times(2)->create();

        $this->countryRepo->expects('all')->andReturn($countries);

        $response = $this->getJson(route('api.b1.countries.index'));

        $this->assertSuccessDataResponse($response, $countries->toArray(), 'Countries retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_countries()
    {
        /** @var Country[] $countries */
        $countries = factory(Country::class)->times(5)->create();

        $response = $this->getJson(route('api.b1.countries.index'));
        $take3 = $this->getJson(route('api.b1.countries.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.countries.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.countries.index', ['search' => $countries[0]->name]));

        $this->assertCount(251, $response->original['data'], '246 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 251);
    }
}