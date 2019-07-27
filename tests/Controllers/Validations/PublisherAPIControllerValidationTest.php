<?php

namespace Tests\Controllers\Validations;

use App\Models\Publisher;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class PublisherAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

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
        $publisher1 = factory(Publisher::class)->create();
        $publisher2 = factory(Publisher::class)->create();

        $this->post('api/b1/publishers/', ['name' => $publisher2->name])
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
    public function test_update_book_fails_when_name_is_duplicate()
    {
        $publisher1 = factory(Publisher::class)->create();
        $publisher2 = factory(Publisher::class)->create();

        $this->put('api/b1/publishers/'.$publisher2->id, ['name' => $publisher2->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }
}
