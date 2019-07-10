<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateBookLanguageAPIRequest;
use App\Http\Requests\API\UpdateBookLanguageAPIRequest;
use App\Models\BookLanguage;
use App\Repositories\BookLanguageRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
     *
     * @return JsonResponse
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
     * @return JsonResponse
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
     * @param BookLanguage $bookLanguage
     *
     * @return JsonResponse
     */
    public function show(BookLanguage $bookLanguage)
    {
        return $this->sendResponse($bookLanguage->toArray(), 'Book Language retrieved successfully.');
    }

    /**
     * Update the specified BookLanguage in storage.
     * PUT/PATCH /bookLanguages/{id}
     *
     * @param BookLanguage $bookLanguage
     * @param UpdateBookLanguageAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(BookLanguage $bookLanguage, UpdateBookLanguageAPIRequest $request)
    {
        $input = $request->all();

        $bookLanguage = $this->bookLanguageRepository->update($input, $bookLanguage->id);

        return $this->sendResponse($bookLanguage->toArray(), 'Book Language updated successfully.');
    }

    /**
     * Remove the specified BookLanguage from storage.
     * DELETE /bookLanguages/{id}
     *
     * @param BookLanguage $bookLanguage
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookLanguage $bookLanguage)
    {
        $bookLanguage->delete();

        return $this->sendResponse($bookLanguage, 'Book Language deleted successfully.');
    }
}
