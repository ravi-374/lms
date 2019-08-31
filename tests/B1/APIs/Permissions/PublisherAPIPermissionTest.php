<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Publisher;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use JWTAuth;
use Tests\TestCase;

/**
 * Class PublisherAPIPermissionTest
 * @package Tests\B1\APIs\Permissions
 */
class PublisherAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = JWTAuth::fromUser($this->loggedInUserId);
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_get_publishers_without_permission()
    {
        $response = $this->getJson(route('api.b1.publishers.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_publisher_without_permission()
    {
        $fakePublisher = factory(Publisher::class)->raw();

        $response = $this->postJson(route('api.b1.publishers.store'), $fakePublisher);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_publisher_without_permission()
    {
        $publisher = factory(Publisher::class)->create();
        $updatePublisher = factory(Publisher::class)->raw(['id' => $publisher->id]);

        $response = $this->putJson(route('api.b1.publishers.update', $publisher->id), $updatePublisher);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_publisher_without_permission()
    {
        $publisher = factory(Publisher::class)->create();

        $response = $this->deleteJson(route('api.b1.publishers.destroy', $publisher->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_publishers_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_publishers']);
        $response = $this->getJson(route('api.b1.publishers.index'));

        $this->assertSuccessMessageResponse($response, 'Publishers retrieved successfully.');
    }

    /** @test */
    public function test_can_create_publisher_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_publishers']);
        $fakePublisher = factory(Publisher::class)->raw();

        $response = $this->postJson(route('api.b1.publishers.store'), $fakePublisher);

        $this->assertExceptionMessage($response, 'Publisher saved successfully.');
    }

    /** @test */
    public function test_can_update_publisher_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_publishers']);
        $publisher = factory(Publisher::class)->create();
        $updatePublisher = factory(Publisher::class)->raw(['id' => $publisher->id]);

        $response = $this->putJson(route('api.b1.publishers.update', $publisher->id), $updatePublisher);

        $this->assertExceptionMessage($response, 'Publisher updated successfully.');
    }

    /** @test */
    public function test_can_delete_publisher_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_publishers']);
        $publisher = factory(Publisher::class)->create();

        $response = $this->deleteJson(route('api.b1.publishers.destroy', $publisher->id));

        $this->assertExceptionMessage($response, 'Publisher deleted successfully.');
    }
}