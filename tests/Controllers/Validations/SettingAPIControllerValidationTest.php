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

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_setting_fails_when_key_is_not_passed()
    {
        $this->post('api/b1/settings', ['key' => ''])
            ->assertSessionHasErrors(['key' => 'The key field is required.']);
    }

    /** @test */
    public function test_create_setting_fails_when_value_is_not_passed()
    {
        $this->post('api/b1/settings', ['value' => ''])
            ->assertSessionHasErrors(['value' => 'The value field is required.']);
    }

    /** @test */
    public function test_create_setting_fails_when_display_name_is_not_passed()
    {
        $this->post('api/b1/settings', ['display_name' => ''])
            ->assertSessionHasErrors(['display_name' => 'The display name field is required.']);
    }

    /** @test */
    public function test_update_setting_fails_when_key_is_not_passed()
    {
        $setting = factory(Setting::class)->create();

        $this->put('api/b1/settings/'.$setting->id, ['key' => ''])
            ->assertSessionHasErrors(['key' => 'The key field is required.']);
    }

    /** @test */
    public function test_update_setting_fails_when_value_is_not_passed()
    {
        $setting = factory(Setting::class)->create();

        $this->put('api/b1/settings/'.$setting->id, ['value' => ''])
            ->assertSessionHasErrors(['value' => 'The value field is required.']);
    }

    /** @test */
    public function test_update_setting_fails_when_display_name_is_not_passed()
    {
        $setting = factory(Setting::class)->create();

        $this->put('api/b1/settings/'.$setting->id, ['display_name' => ''])
            ->assertSessionHasErrors(['display_name' => 'The display name field is required.']);
    }

    /** @test */
    public function it_can_store_setting()
    {
        $key = $this->faker->name;
        $value = $this->faker->word;
        $displayName = $this->faker->word;
        $response = $this->postJson('api/b1/settings', [
            'key'          => $key,
            'value'        => $value,
            'display_name' => $displayName,
        ]);

        $this->assertSuccessMessageResponse($response, 'Setting saved successfully.');
        $this->assertNull(Setting::whereKey($key)->first());
        $this->assertNotEmpty(Setting::whereValue($value)->first());
        $this->assertNotEmpty(Setting::whereDisplayName($displayName)->first());
    }

    /** @test */
    public function it_can_update_setting()
    {
        /** @var Setting $setting */
        $setting = factory(Setting::class)->create();

        $key = $this->faker->name;
        $value = $this->faker->word;
        $displayName = $this->faker->word;
        $response = $this->putJson('api/b1/settings/'.$setting->id, [
            'key'          => $key,
            'value'        => $value,
            'display_name' => $displayName,
        ]);

        $this->assertSuccessMessageResponse($response, 'Setting updated successfully.');
        $this->assertEquals($key, $setting->fresh()->key);
        $this->assertEquals($value, $setting->fresh()->value);
        $this->assertEquals($displayName, $setting->fresh()->display_name);
    }
}
