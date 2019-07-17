<?php
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreatePublisherAPIRequest;
use App\Http\Requests\API\UpdatePublisherAPIRequest;
use App\Models\Publisher;
use App\Repositories\PublisherRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class PublisherAPIController
 * @package App\Http\Controllers\API
 */
class PublisherAPIController extends AppBaseController
{
    /** @var  PublisherRepository */
    private $publisherRepository;

    public function __construct(PublisherRepository $publisherRepo)
    {
        $this->publisherRepository = $publisherRepo;
    }

    /**
     * Display a listing of the Publisher.
     * GET|HEAD /publishers
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $publishers = $this->publisherRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($publishers->toArray(), 'Publishers retrieved successfully.');
    }

    /**
     * Store a newly created Publisher in storage.
     * POST /publishers
     *
     * @param CreatePublisherAPIRequest $request
     *
     * @return JsonResponse
     */
    public function store(CreatePublisherAPIRequest $request)
    {
        $input = $request->all();

        $publisher = $this->publisherRepository->create($input);

        return $this->sendResponse($publisher->toArray(), 'Publisher saved successfully.');
    }

    /**
     * Display the specified Publisher.
     * GET|HEAD /publishers/{id}
     *
     * @param Publisher $publisher
     *
     * @return JsonResponse
     */
    public function show(Publisher $publisher)
    {
        return $this->sendResponse($publisher->toArray(), 'Publisher retrieved successfully.');
    }

    /**
     * Update the specified Publisher in storage.
     * PUT/PATCH /publishers/{id}
     *
     * @param Publisher $publisher
     * @param UpdatePublisherAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(Publisher $publisher, UpdatePublisherAPIRequest $request)
    {
        $input = $request->all();

        $publisher = $this->publisherRepository->update($input, $publisher->id);

        return $this->sendResponse($publisher->toArray(), 'Publisher updated successfully.');
    }

    /**
     * Remove the specified Publisher from storage.
     * DELETE /publishers/{id}
     *
     * @param Publisher $publisher
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Publisher $publisher)
    {
        if (!empty($publisher->bookItems->toArray())) {
            throw new BadRequestHttpException('Publisher can not be delete, it is used in one or more book items.');
        }
        $publisher->delete();

        return $this->sendResponse($publisher, 'Publisher deleted successfully.');
    }
}
