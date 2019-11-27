<?php

namespace Tests\B1\APIs;

use App\Models\Testimonial;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class TestimonialAPIControllerTest
 */
class TestimonialAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_testimonials()
    {
        factory(Testimonial::class, 5)->create();

        $all = $this->getJson(route('api.b1.testimonials.index'));
        $take3 = $this->getJson(route('api.b1.testimonials.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.testimonials.index', ['skip' => 2, 'limit' => 4]));

        $this->assertCount(5, $all->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(3, $skip2->original['data']);
    }

    /** @test */
    public function test_can_create_testimonial()
    {
        $fakeTestimonial = factory(Testimonial::class)->raw();

        $response = $skip2 = $this->postJson(route('api.b1.testimonials.store', $fakeTestimonial));

        $this->assertSuccessMessageResponse($response, 'Testimonial saved successfully.');
        $this->assertArrayHasKey('id', $response->original['data']);
    }

    /** @test */
    public function test_can_update_testimonial()
    {
        $testimonial = factory(Testimonial::class)->create();
        $updateTestimonial = factory(Testimonial::class)->raw(['id' => $testimonial->id]);

        $response = $skip2 = $this->postJson(route('api.b1.testimonials.update', $testimonial->id), $updateTestimonial);

        $this->assertSuccessMessageResponse($response, 'Testimonial updated successfully.');
        $this->assertArrayHasKey('id', $response->original['data']);
        $this->assertEquals($updateTestimonial['name'], $response->original['data']['name']);
    }

    /** @test */
    public function test_can_get_testimonial()
    {
        $testimonial = factory(Testimonial::class)->create();

        $response = $skip2 = $this->getJson(route('api.b1.testimonials.show', $testimonial->id));

        $this->assertSuccessMessageResponse($response, 'Testimonial retrieved successfully.');
        $this->assertEquals($testimonial->id, $response->original['data']['id']);
    }

    /** @test */
    public function test_can_destroy_testimonial()
    {
        $testimonial = factory(Testimonial::class)->create();

        $response = $skip2 = $this->deleteJson(route('api.b1.testimonials.destroy', $testimonial->id));

        $this->assertSuccessMessageResponse($response, 'Testimonial deleted successfully.');
        $this->assertEmpty(Testimonial::find($testimonial->id));
    }
}
