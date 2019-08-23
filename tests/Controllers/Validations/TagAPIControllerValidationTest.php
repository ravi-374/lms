<?php

namespace Tests\Controllers\Validations;

use App\Models\Tag;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class TagAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_tag_fails_when_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/tags', ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_tag_fails_when_name_is_duplicate()
    {
        $tag = factory(Tag::class)->create();

        $response = $this->postJson('api/b1/tags/', ['name' => $tag->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_tag_fails_when_name_is_not_passed()
    {
        $tag = factory(Tag::class)->create();

        $response = $this->putJson('api/b1/tags/'.$tag->id, ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_tag_fails_when_name_is_duplicated()
    {
        $tags = factory(Tag::class)->times(2)->create();

        $response = $this->putJson('api/b1/tags/'.$tags[1]->id, ['name' => $tags[0]->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_tag()
    {
        $fakeTag = factory(Tag::class)->raw();

        $response = $this->postJson('api/b1/tags', $fakeTag);

        $this->assertSuccessMessageResponse($response, 'Tag saved successfully.');
        $this->assertNotEmpty(Tag::where('name', $fakeTag['name'])->first());
    }

    /** @test */
    public function it_can_update_tag()
    {
        $tag = factory(Tag::class)->create();

        $fakeTag = factory(Tag::class)->raw();

        $response = $this->putJson('api/b1/tags/'.$tag->id, $fakeTag);

        $this->assertSuccessMessageResponse($response, 'Tag updated successfully.');
        $this->assertEquals($fakeTag['name'], $tag->fresh()->name);
    }

    /** @test */
    public function it_can_delete_tag()
    {
        $tag = factory(Tag::class)->create();

        $response = $this->deleteJson('api/b1/tags/'.$tag->id);

        $this->assertSuccessMessageResponse($response, 'Tag deleted successfully.');
        $this->assertEmpty(Tag::where('name', $tag->name)->first());
    }
}