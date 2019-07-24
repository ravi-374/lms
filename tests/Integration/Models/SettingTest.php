<?php

namespace Tests\Integration\Models;

use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SettingTest
 * @package Tests\Integration\Models
 */
class SettingTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_get_setting_of_given_key()
    {
        $setting1 = factory(Setting::class)->create();
        $setting2 = factory(Setting::class)->create();

        $settings = Setting::ofKey($setting1->key)->get();
        $this->assertCount(1, $settings);

        $firstSetting = $settings->first();
        $this->assertEquals($setting1->id, $firstSetting->id);
        $this->assertEquals($setting1->key, $firstSetting->key);
    }
}