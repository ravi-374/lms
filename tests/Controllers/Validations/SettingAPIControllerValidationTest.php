<?php

namespace Tests\Controllers\Validations;

use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SettingAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_setting_fails_when_key_is_not_passed()
    {
        $response = $this->postJson('api/b1/settings', ['key' => '']);

        $this->assertExceptionMessage($response, 'The key field is required.');
    }

    /** @test */
    public function test_create_setting_fails_when_value_is_not_passed()
    {
        $response = $this->postJson('api/b1/settings', ['key' => $this->faker->name, 'value' => '']);

        $this->assertExceptionMessage($response, 'The value field is required.');
    }

    /** @test */
    public function test_create_setting_fails_when_display_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/settings', ['key' => $this->faker->name, 'value' => $this->faker->word]);

        $this->assertExceptionMessage($response, 'The display name field is required.');
    }

    /** @test */
    public function test_update_setting_fails_when_key_is_not_passed()
    {
        $setting = factory(Setting::class)->create();

        $response = $this->putJson('api/b1/settings/'.$setting->id, ['key' => '']);

        $this->assertExceptionMessage($response, 'The key field is required.');
    }

    /** @test */
    public function test_update_setting_fails_when_value_is_not_passed()
    {
        $setting = factory(Setting::class)->create();

        $response = $this->putJson('api/b1/settings/'.$setting->id, ['key' => $this->faker->name, 'value' => '']);

        $this->assertExceptionMessage($response, 'The value field is required.');
    }

    /** @test */
    public function test_update_setting_fails_when_display_name_is_not_passed()
    {
        $setting = factory(Setting::class)->create();

        $response = $this->putJson('api/b1/settings/'.$setting->id,
            ['key' => $this->faker->name, 'value' => $this->faker->word]
        );

        $this->assertExceptionMessage($response, 'The display name field is required.');
    }

    /** @test */
    public function it_can_store_setting()
    {
        $fakeSetting = factory(Setting::class)->make()->toArray();
        $response = $this->postJson('api/b1/settings', $fakeSetting);

        $this->assertSuccessMessageResponse($response, 'Setting saved successfully.');
        $this->assertNotEmpty(Setting::where('key', $fakeSetting['key'])->first());
    }

    /** @test */
    public function it_can_update_setting()
    {
        $setting = factory(Setting::class)->create();
        $fakeSetting = factory(Setting::class)->make()->toArray();

        $response = $this->putJson('api/b1/settings/'.$setting->id, $fakeSetting);

        $this->assertSuccessMessageResponse($response, 'Setting updated successfully.');
        $this->assertEquals($fakeSetting['key'], $setting->fresh()->key);
    }

    /** @test */
    public function it_can_delete_setting()
    {
        $setting = factory(Setting::class)->create();

        $response = $this->deleteJson('api/b1/settings/'.$setting->id);

        $this->assertSuccessMessageResponse($response, 'Setting deleted successfully.');
        $this->assertEmpty(Setting::where('key', $setting->key)->first());
    }
}
