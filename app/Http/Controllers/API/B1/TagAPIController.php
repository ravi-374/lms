<?php
namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateTagAPIRequest;
use App\Http\Requests\API\UpdateTagAPIRequest;
use App\Models\Tag;
use App\Repositories\TagRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class TagAPIController
 * @package App\Http\Controllers\API
 */
class TagAPIController extends AppBaseController
{
    /** @var  TagRepository */
    private $tagRepository;

    public function __construct(TagRepository $tagRepo)
    {
        $this->tagRepository = $tagRepo;
    }

    /**
     * Display a listing of the Tag.
     * GET|HEAD /tags
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $tags = $this->tagRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $tags->toArray(),
            'Tags retrieved successfully.',
            $this->getTotalRecords(Tag::class, $input, $tags)
        );
    }

    /**
     * Store a newly created Tag in storage.
     * POST /tags
     *
     * @param CreateTagAPIRequest $request
     *
     * @return JsonResponse
     */
    public function store(CreateTagAPIRequest $request)
    {
        $input = $request->all();

        $tag = $this->tagRepository->create($input);

        return $this->sendResponse($tag->toArray(), 'Tag saved successfully.');
    }

    /**
     * Display the specified Tag.
     * GET|HEAD /tags/{id}
     *
     * @param Tag $tag
     *
     * @return JsonResponse
     */
    public function show(Tag $tag)
    {
        return $this->sendResponse($tag->toArray(), 'Tag retrieved successfully.');
    }

    /**
     * Update the specified Tag in storage.
     * PUT/PATCH /tags/{id}
     *
     * @param Tag $tag
     * @param UpdateTagAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(Tag $tag, UpdateTagAPIRequest $request)
    {
        $input = $request->all();

        $tag = $this->tagRepository->update($input, $tag->id);

        return $this->sendResponse($tag->toArray(), 'Tag updated successfully.');
    }

    /**
     * Remove the specified Tag from storage.
     * DELETE /tags/{id}
     *
     * @param Tag $tag
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return $this->sendResponse($tag, 'Tag deleted successfully.');
    }
}
