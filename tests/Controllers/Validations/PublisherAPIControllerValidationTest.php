<?php

namespace Tests\Controllers\Validations;

use App\Models\BookItem;
use App\Models\Publisher;
use Illuminate\Foundation\Testing\DatabaseTransactions;
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

    /** @test */
    public function test_can_not_delete_publisher_when_publisher_is_used_to_one_more_book_items()
    {
        $publisher = factory(Publisher::class)->create();
        $bookItem = factory(BookItem::class)->create(['publisher_id' => $publisher->id]);

        $response = $this->deleteJson('api/b1/publishers/'.$publisher->id);

        $this->assertExceptionMessage($response, 'Publisher can not be delete, it is used in one or more book items.');
    }

    /** @test */
    public function it_can_delete_publisher()
    {
        $publisher = factory(Publisher::class)->create();

        $response = $this->deleteJson('api/b1/publishers/'.$publisher->id);

        $this->assertSuccessMessageResponse($response, 'Publisher deleted successfully.');
        $this->assertEmpty(Publisher::where('name', $publisher->name)->first());
    }
}