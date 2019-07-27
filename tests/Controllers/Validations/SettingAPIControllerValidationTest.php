<?php

namespace Tests\Controllers\Validations;

use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class SettingAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_setting_fails_when_key_is_not_passed()
    {
        $this->post('api/b1/settings', ['key' => ''])
            ->assertSessionHasErrors(['name' => 'The key field is required.']);
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
}
