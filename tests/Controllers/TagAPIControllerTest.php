<?php

namespace Tests\Controllers;

use App\Models\Tag;
use App\Repositories\TagRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Mockery\MockInterface;
use Tests\TestCase;

class TagAPIControllerTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    /** @var MockInterface */
    protected $tagRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
        $this->withHeaders(['X-Requested-With' => 'XMLHttpRequest']);
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
    public function it_can_store_tag()
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
    public function it_can_retrieve_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();

        $response = $this->getJson('api/b1/tags/'.$tag->id);

        $this->assertSuccessMessageResponse($response, 'Tag retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create();

        $response = $this->deleteJson("api/b1/tags/$tag->id");

        $this->assertSuccessMessageResponse($response, 'Tag deleted successfully.');
    }
}