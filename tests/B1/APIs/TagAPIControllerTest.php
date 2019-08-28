<?php

namespace Tests\B1\APIs;

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

        /** @var Tag[] $tags */
        $tags = factory(Tag::class)->times(5)->create();

        $this->tagRepository->expects('all')->andReturn($tags);

        $response = $this->getJson(route('api.b1.tags.index'));

        $this->assertSuccessDataResponse($response, $tags->toArray(), 'Tags retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_tags()
    {
        /** @var Tag[] $tags */
        $tags = factory(Tag::class)->times(5)->create();

        $response = $this->getJson(route('api.b1.tags.index'));
        $take3 = $this->getJson(route('api.b1.tags.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.tags.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.tags.index', ['search' => $tags[0]->name]));

        $this->assertCount(18, $response->original['data'], '13 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(18, $response->original['totalRecords'], '13 defaults');

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 18);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function it_can_create_tag()
    {
        $this->mockRepository();

        $tag = factory(Tag::class)->make();

        $this->tagRepository->expects('create')
            ->with($tag->toArray())
            ->andReturn($tag);

        $response = $this->postJson(route('api.b1.tags.store'), $tag->toArray());

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag saved successfully.');
    }

    /** @test */
    public function it_can_update_tag()
    {
        $this->mockRepository();

        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();
        $fakeTag = factory(Tag::class)->make(['id' => $tag->id]);

        $this->tagRepository->expects('update')
            ->with($fakeTag->toArray(), $tag->id)
            ->andReturn($fakeTag);

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), $fakeTag->toArray());

        $this->assertSuccessDataResponse($response, $fakeTag->toArray(), 'Tag updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();

        $response = $this->getJson(route('api.b1.tags.show', $tag->id));

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();

        $response = $this->deleteJson(route('api.b1.tags.destroy', $tag->id));

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag deleted successfully.');
        $this->assertEmpty(Tag::find($tag->id));
    }
}