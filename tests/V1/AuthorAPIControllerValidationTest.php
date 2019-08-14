<?php

namespace Tests\V1;

use App\Models\Author;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class AuthorAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_authors()
    {
        /** @var Author $authors */
        $authors = factory(Author::class)->times(5)->create();

        $response = $this->getJson('api/v1/authors');

        $this->assertSuccessDataResponse($response, $authors->toArray(), 'Authors retrieved successfully.');
    }
}