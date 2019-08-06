<?php

namespace Tests\Controllers;

use App\Models\Setting;
use App\Models\Tag;
use App\Repositories\SettingRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Mockery\MockInterface;
use Tests\TestCase;

class SettingAPIControllerTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    /** @var MockInterface */
    protected $settingRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
        $this->withHeaders(['X-Requested-With' => 'XMLHttpRequest']);
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
    public function it_can_store_setting()
    {
        $this->mockRepository();

        $setting = factory(Setting::class)->make();

        $this->settingRepo->shouldReceive('createOrUpdate')
            ->once()
            ->with($setting->toArray())
            ->andReturn($setting);

        $response = $this->postJson('api/b1/settings', $setting->toArray());

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting saved successfully.');
    }

    /** @test */
    public function it_can_retrieve_setting()
    {
        /** @var Tag $setting */
        $setting = factory(Setting::class)->create();

        $response = $this->getJson('api/b1/settings/'.$setting->id);

        $this->assertSuccessMessageResponse($response, 'Setting retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_setting()
    {
        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();

        $response = $this->deleteJson("api/b1/settings/$setting->id");

        $this->assertSuccessMessageResponse($response, 'Setting deleted successfully.');
    }
}