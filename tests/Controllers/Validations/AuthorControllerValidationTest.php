<?php

namespace Tests\Controllers\Validations;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\Author;
use Tests\TestCase;

class AuthorControllerValidationTest extends TestCase
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
        $this->post('authors', ['first_name' => ''])
            ->assertSessionHasErrors('first_name');
    }


    /** @test */
    public function test_update_author_fails_when_first_name_is_not_passed()
    {
        $author = factory(Author::class)->create();

        $this->put('authors/' . $author->id, ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }
}