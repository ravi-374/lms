<?php

namespace Tests\Controllers;

use App\Models\Tag;
use App\Repositories\TagRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class TagAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $tagRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->tagRepository = \Mockery::mock(TagRepository::class);
        app()->instance(TagRepository::class, $this->tagRepository);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_tags()
    {
        $this->mockRepository();

        $tags = factory(Tag::class)->times(5)->create();

        $this->tagRepository->shouldReceive('all')
            ->once()
            ->andReturn($tags);

        $response = $this->getJson('api/b1/tags');

        $this->assertSuccessDataResponse($response, $tags->toArray(), 'Tags retrieved successfully.');
    }

    /** @test */
    public function test_can_get_tags()
    {
        /** @var Tag $tags */
        $tags = factory(Tag::class)->times(5)->create();

        $response = $this->getJson('api/b1/tags');
        $search = $this->getJson('api/b1/tags?search='.$tags[0]->name);
        $take3 = $this->getJson('api/b1/tags?limit=3');
        $skip2 = $this->getJson('api/b1/tags?skip=2&limit=2');

        $response = $response->original['data'];
        $this->assertCount(18, $response, '13 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $this->assertCount(1, $search->original['data']);
        $this->assertEquals($tags[0]->name, $search->original['data'][0]['name']);
    }

    /** @test */
    public function it_can_create_tag()
    {
        $this->mockRepository();

        $tag = factory(Tag::class)->make();

        $this->tagRepository->shouldReceive('create')
            ->once()
            ->with($tag->toArray())
            ->andReturn($tag);

        $response = $this->postJson('api/b1/tags', $tag->toArray());

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag saved successfully.');
    }

    /** @test */
    public function it_can_update_tag()
    {
        $this->mockRepository();

        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();
        $fakeTag = factory(Tag::class)->make(['id' => $tag->id]);

        $this->tagRepository->shouldReceive('update')
            ->once()
            ->with($fakeTag->toArray(), $tag->id)
            ->andReturn($fakeTag);

        $response = $this->putJson('api/b1/tags/'.$tag->id, $fakeTag->toArray());

        $this->assertSuccessDataResponse($response, $fakeTag->toArray(), 'Tag updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();

        $response = $this->getJson('api/b1/tags/'.$tag->id);

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();

        $response = $this->deleteJson("api/b1/tags/$tag->id");

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag deleted successfully.');
        $this->assertEmpty(Tag::find($tag->id));
    }
}