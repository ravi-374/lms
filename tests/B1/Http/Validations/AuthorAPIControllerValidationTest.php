<?php

namespace Tests\B1\Http\Validations;

use App\Models\Author;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthorAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_author_fails_when_first_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/authors', ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_create_author_with_valid_input()
    {
        $author = factory(Author::class)->raw();

        $response = $this->postJson('api/b1/authors', $author);

        $this->assertSuccessDataResponse($response, $author, 'Author saved successfully.');
    }

    /** @test */
    public function test_update_author_fails_when_first_name_is_not_passed()
    {
        $author = factory(Author::class)->create();

        $response = $this->putJson('api/b1/authors/'.$author->id, ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }
}