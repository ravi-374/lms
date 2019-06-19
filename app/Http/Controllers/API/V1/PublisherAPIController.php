<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\API\CreatePublisherAPIRequest;
use App\Http\Requests\API\UpdatePublisherAPIRequest;
use App\Models\Publisher;
use App\Repositories\PublisherRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class PublisherController
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
     * @return Response
     */
    public function index(Request $request)
    {
        $publishers = $this->publisherRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($publishers->toArray(), 'Publishers retrieved successfully');
    }

    /**
     * Store a newly created Publisher in storage.
     * POST /publishers
     *
     * @param CreatePublisherAPIRequest $request
     *
     * @return Response
     */
    public function store(CreatePublisherAPIRequest $request)
    {
        $input = $request->all();

        $publisher = $this->publisherRepository->create($input);

        return $this->sendResponse($publisher->toArray(), 'Publisher saved successfully');
    }

    /**
     * Display the specified Publisher.
     * GET|HEAD /publishers/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Publisher $publisher */
        $publisher = $this->publisherRepository->find($id);

        if (empty($publisher)) {
            return $this->sendError('Publisher not found');
        }

        return $this->sendResponse($publisher->toArray(), 'Publisher retrieved successfully');
    }

    /**
     * Update the specified Publisher in storage.
     * PUT/PATCH /publishers/{id}
     *
     * @param int $id
     * @param UpdatePublisherAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdatePublisherAPIRequest $request)
    {
        $input = $request->all();

        /** @var Publisher $publisher */
        $publisher = $this->publisherRepository->find($id);

        if (empty($publisher)) {
            return $this->sendError('Publisher not found');
        }

        $publisher = $this->publisherRepository->update($input, $id);

        return $this->sendResponse($publisher->toArray(), 'Publisher updated successfully');
    }

    /**
     * Remove the specified Publisher from storage.
     * DELETE /publishers/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Publisher $publisher */
        $publisher = $this->publisherRepository->find($id);

        if (empty($publisher)) {
            return $this->sendError('Publisher not found');
        }

        $publisher->delete();

        return $this->sendResponse($id, 'Publisher deleted successfully');
    }
}
