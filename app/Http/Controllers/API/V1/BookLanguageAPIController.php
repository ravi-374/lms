<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\API\CreateBookLanguageAPIRequest;
use App\Http\Requests\API\UpdateBookLanguageAPIRequest;
use App\Models\BookLanguage;
use App\Repositories\BookLanguageRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class BookLanguageAPIController
 * @package App\Http\Controllers\API
 */
class BookLanguageAPIController extends AppBaseController
{
    /** @var  BookLanguageRepository */
    private $bookLanguageRepository;

    public function __construct(BookLanguageRepository $bookLanguageRepo)
    {
        $this->bookLanguageRepository = $bookLanguageRepo;
    }

    /**
     * Display a listing of the BookLanguage.
     * GET|HEAD /bookLanguages
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $bookLanguages = $this->bookLanguageRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($bookLanguages->toArray(), 'Book Languages retrieved successfully.');
    }

    /**
     * Store a newly created BookLanguage in storage.
     * POST /bookLanguages
     *
     * @param CreateBookLanguageAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateBookLanguageAPIRequest $request)
    {
        $input = $request->all();

        $bookLanguage = $this->bookLanguageRepository->create($input);

        return $this->sendResponse($bookLanguage->toArray(), 'Book Language saved successfully.');
    }

    /**
     * Display the specified BookLanguage.
     * GET|HEAD /bookLanguages/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = $this->bookLanguageRepository->findOrFail($id);

        return $this->sendResponse($bookLanguage->toArray(), 'Book Language retrieved successfully.');
    }

    /**
     * Update the specified BookLanguage in storage.
     * PUT/PATCH /bookLanguages/{id}
     *
     * @param int $id
     * @param UpdateBookLanguageAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateBookLanguageAPIRequest $request)
    {
        $input = $request->all();

        $this->bookLanguageRepository->findOrFail($id);

        $bookLanguage = $this->bookLanguageRepository->update($input, $id);

        return $this->sendResponse($bookLanguage->toArray(), 'Book Language updated successfully.');
    }

    /**
     * Remove the specified BookLanguage from storage.
     * DELETE /bookLanguages/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = $this->bookLanguageRepository->findOrFail($id);

        $bookLanguage->delete();

        return $this->sendResponse($id, 'Book Language deleted successfully.');
    }
}
