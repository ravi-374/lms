<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Author;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthorAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_create_author_fails_when_first_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.authors.store'), ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_create_author_with_valid_input()
    {
        $author = factory(Author::class)->raw();

        $response = $this->postJson(route('api.b1.authors.store'), $author);

        $this->assertSuccessDataResponse($response, $author, 'Author saved successfully.');
    }

    /** @test */
    public function test_update_author_fails_when_first_name_is_not_passed()
    {
        $author = factory(Author::class)->create();

        $response = $this->putJson(route('api.b1.authors.update', $author->id), ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }
}