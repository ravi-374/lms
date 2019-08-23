<?php

namespace Tests\Controllers;

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

        $settings = factory(Setting::class)->times(5)->create();

        $this->settingRepo->expects('all')
            ->once()
            ->andReturn($settings);

        $response = $this->getJson('api/b1/settings');

        $this->assertSuccessDataResponse($response, $settings->toArray(), 'Settings retrieved successfully.');
    }

    /** @test */
    public function it_can_store_setting()
    {
        $this->mockRepository();

        $setting = factory(Setting::class)->make();

        $this->settingRepo->expects('createOrUpdate')
            ->once()
            ->with($setting->toArray())
            ->andReturn($setting);

        $response = $this->postJson('api/b1/settings', $setting->toArray());

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting saved successfully.');
    }

    /** @test */
    public function it_can_update_setting()
    {
        $this->mockRepository();

        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();
        $fakeSetting = factory(Setting::class)->make();

        $this->settingRepo->expects('update')
            ->once()
            ->with($fakeSetting->toArray(), $setting->id)
            ->andReturn($fakeSetting);

        $response = $this->putJson('api/b1/settings/'.$setting->id, $fakeSetting->toArray());

        $this->assertSuccessDataResponse($response, $fakeSetting->toArray(), 'Setting updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_setting()
    {
        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();

        $response = $this->getJson('api/b1/settings/'.$setting->id);

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_setting()
    {
        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();

        $response = $this->deleteJson("api/b1/settings/$setting->id");

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting deleted successfully.');
        $this->assertEmpty(Setting::find($setting->id));
    }
}