<?php

namespace Tests\Controllers\Validations;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\Author;
use Tests\TestCase;

class AuthorControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();

//        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_author_fails_when_first_name_is_not_passed()
    {
        $this->post('api/b1/authors', ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }

    /** @test */
    public function test_update_author_fails_when_first_name_is_not_passed()
    {
        $author = factory(Author::class)->create();

        $this->put('api/b1/authors/'.$author->id, ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }
}