<?php

namespace Tests\Controllers\Validations;

use App\Models\Publisher;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class PublisherAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_publisher_fails_when_name_is_not_passed()
    {
        $this->post('api/b1/publishers', ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_create_publisher_fails_when_name_is_duplicate()
    {
        $publisher = factory(Publisher::class)->create();

        $this->post('api/b1/publishers/', ['name' => $publisher->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function test_update_publisher_fails_when_name_is_not_passed()
    {
        $publisher = factory(Publisher::class)->create();

        $this->put('api/b1/publishers/'.$publisher->id, ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_update_publisher_fails_when_name_is_duplicate()
    {
        $publisher1 = factory(Publisher::class)->create();
        $publisher2 = factory(Publisher::class)->create();

        $this->put('api/b1/publishers/'.$publisher2->id, ['name' => $publisher1->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function it_can_store_publisher()
    {
        $response = $this->postJson('api/b1/publishers', ['name' => $this->faker->name]);

        $this->assertSuccessMessageResponse($response, 'Publisher saved successfully.');
    }

    /** @test */
    public function it_can_update_publisher()
    {
        /** @var Publisher $publisher */
        $publisher = factory(Publisher::class)->create();

        $newName = $this->faker->name;
        $response = $this->putJson('api/b1/publishers/'.$publisher->id, ['name' => $newName]);

        $this->assertSuccessMessageResponse($response, 'Publisher updated successfully.');
        $this->assertEquals($newName, $publisher->fresh()->name);
    }
}