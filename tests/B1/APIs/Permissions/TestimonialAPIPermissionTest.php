<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Testimonial;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class TestimonialAPIPermissionTest
 */
class TestimonialAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = $this->loggedInUserId->createToken('admin_token')->plainTextToken;
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_get_testimonials_without_permission()
    {
        $response = $this->getJson(route('api.b1.testimonials.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_testimonials_without_permission()
    {
        $testimonial = factory(Testimonial::class)->raw();

        $response = $this->postJson(route('api.b1.testimonials.index'), $testimonial);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_testimonials_without_permission()
    {
        $testimonial = factory(Testimonial::class)->create();
        $updateTestimonial = factory(Testimonial::class)->raw(['id' => $testimonial->id]);

        $response = $this->postJson(route('api.b1.testimonials.update', $testimonial->id), $updateTestimonial);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_get_testimonial_without_permission()
    {
        $testimonial = factory(Testimonial::class)->create();

        $response = $this->getJson(route('api.b1.testimonials.show', $testimonial->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_testimonial_without_permission()
    {
        $testimonial = factory(Testimonial::class)->create();

        $response = $this->deleteJson(route('api.b1.testimonials.destroy', $testimonial->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_testimonials_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        factory(Testimonial::class, 2)->create();

        $response = $this->getJson(route('api.b1.testimonials.index'));

        $this->assertSuccessMessageResponse($response, 'Testimonials retrieved successfully.');
    }

    /** @test */
    public function test_can_create_testimonial_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $testimonial = factory(Testimonial::class)->raw();

        $response = $this->postJson(route('api.b1.testimonials.store'), $testimonial);

        $this->assertSuccessMessageResponse($response, 'Testimonial saved successfully.');
    }

    /** @test */
    public function test_can_update_testimonial_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $testimonial = factory(Testimonial::class)->create();
        $updateTestimonial = factory(Testimonial::class)->raw(['id' => $testimonial->id]);

        $response = $this->postJson(route('api.b1.testimonials.update', $testimonial->id), $updateTestimonial);

        $this->assertSuccessMessageResponse($response, 'Testimonial updated successfully.');
    }

    /** @test */
    public function test_can_get_testimonial_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $testimonial = factory(Testimonial::class)->create();

        $response = $this->getJson(route('api.b1.testimonials.show', $testimonial->id));

        $this->assertSuccessMessageResponse($response, 'Testimonial retrieved successfully.');
    }

    /** @test */
    public function test_can_delete_testimonial_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $testimonial = factory(Testimonial::class)->create();

        $response = $this->deleteJson(route('api.b1.testimonials.destroy', $testimonial->id));

        $this->assertSuccessMessageResponse($response, 'Testimonial deleted successfully.');
    }
}
