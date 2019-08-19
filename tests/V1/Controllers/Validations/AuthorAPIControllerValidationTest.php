<?php

namespace Tests\V1\Controllers\Validations;

use App\Models\Author;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthorAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->withHeaders(['X-Requested-With' => 'XMLHttpRequest']);
    }

    /** @test */
    public function test_can_get_all_authors()
    {
        /** @var Author $authors */
        $authors = factory(Author::class)->times(5)->create();

        $response = $this->getJson('api/v1/authors');

        $this->assertSuccessMessageResponse($response, 'Authors retrieved successfully.');
        $this->assertCount(15, $response->original['data'], '10 Default');
    }
}