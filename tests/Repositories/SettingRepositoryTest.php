<?php

namespace Tests\Repositories;

use App\Models\Setting;
use App\Repositories\SettingRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
/**
 * Class SettingRepositoryTest
 * @package Tests\Repositories
 */
class SettingRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var SettingRepository
     */
    private $settingRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->settingRepo = app(SettingRepository::class);
    }

    /** @test */
    public function test_can_create_setting()
    {
        $inputs = [
            'key'          => $this->faker->word,
            'value'        => $this->faker->randomDigit,
            'display_name' => $this->faker->word,
        ];

        $setting = $this->settingRepo->createOrUpdate($inputs)->toArray();

        $this->assertArrayHasKey('id', $setting);
        $this->assertEquals($inputs['key'], $setting['key']);
    }

    /** @test */
    public function test_can_update_setting_when_key_with_name_already_exist()
    {
        $setting = factory(Setting::class)->create();
        $inputs = [
            'key'          => $setting->key,
            'value'        => $this->faker->randomDigit,
            'display_name' => $this->faker->word,
        ];

        $setting = $this->settingRepo->createOrUpdate($inputs)->toArray();

        $this->assertArrayHasKey('id', $setting);
        $this->assertEquals($inputs['key'], $setting['key']);
        $this->assertEquals($inputs['value'], $setting['value']);
    }
}