<?php

namespace Tests\Models;

use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SettingTest
 */
class SettingTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_get_setting_of_given_key()
    {
        /** @var Setting $setting1 */
        $setting1 = factory(Setting::class)->create();
        $setting2 = factory(Setting::class)->create();

        $settings = Setting::ofKey($setting1->key)->get();
        $this->assertCount(1, $settings);

        $firstSetting = $settings->first();
        $this->assertEquals($setting1->id, $firstSetting->id);
        $this->assertEquals($setting1->key, $firstSetting->key);
    }

    /** @test */
    public function test_return_setting_logo_path()
    {
        $setting = factory(Setting::class)->create();

        $setting = Setting::first();

        $this->assertNotEmpty($setting->logo_url);
    }
}
