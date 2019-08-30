<?php

namespace Tests\B1\APIs;

use App\Models\Setting;
use App\Repositories\SettingRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class SettingAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $settingRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->settingRepo = \Mockery::mock(SettingRepository::class);
        app()->instance(SettingRepository::class, $this->settingRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_settings()
    {
        $this->mockRepository();

        /** @var Setting[] $settings */
        $settings = factory(Setting::class)->times(5)->create();

        $this->settingRepo->expects('all')->andReturn($settings);

        $response = $this->getJson(route('api.b1.settings.index'));

        $this->assertSuccessDataResponse($response, $settings->toArray(), 'Settings retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_settings()
    {
        /** @var Setting[] $settings */
        $settings = factory(Setting::class)->times(5)->create();

        $response = $this->getJson(route('api.b1.settings.index'));
        $take3 = $this->getJson(route('api.b1.settings.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.settings.index', ['skip' => 2, 'limit' => 2]));
        $searchByKey = $this->getJson(route('api.b1.settings.index', ['search' => $settings[0]->key]));

        $this->assertCount(8, $response->original['data'], '3 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByKey->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 8);
    }

    /** @test */
    public function it_can_store_setting()
    {
        $this->mockRepository();

        $settings = factory(Setting::class)->times(2)->raw();

        $this->settingRepo->expects('createOrUpdate')
            ->with($settings)
            ->andReturn($settings);

        $response = $this->postJson(route('api.b1.settings.store'), $settings);

        $this->assertSuccessDataResponse($response, $settings, 'Setting saved successfully.');
    }

    /** @test */
    public function it_can_update_setting()
    {
        $this->mockRepository();

        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();
        $fakeSetting = factory(Setting::class)->make();

        $this->settingRepo->expects('update')
            ->with($fakeSetting->toArray(), $setting->id)
            ->andReturn($fakeSetting);

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), $fakeSetting->toArray());

        $this->assertSuccessDataResponse($response, $fakeSetting->toArray(), 'Setting updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_setting()
    {
        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();

        $response = $this->getJson(route('api.b1.settings.show', $setting->id));

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_setting()
    {
        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();

        $response = $this->deleteJson(route('api.b1.settings.destroy', $setting->id));

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting deleted successfully.');
        $this->assertEmpty(Setting::find($setting->id));
    }
}