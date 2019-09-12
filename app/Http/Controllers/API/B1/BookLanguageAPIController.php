<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateBookLanguageAPIRequest;
use App\Http\Requests\API\UpdateBookLanguageAPIRequest;
use App\Models\BookLanguage;
use App\Repositories\Contracts\BookLanguageRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class BookLanguageAPIController
 */
class BookLanguageAPIController extends AppBaseController
{
    /** @var  BookLanguageRepositoryInterface */
    private $bookLanguageRepository;

    public function __construct(BookLanguageRepositoryInterface $bookLanguageRepo)
    {
        $this->bookLanguageRepository = $bookLanguageRepo;
    }

    /**
     * Display a listing of the BookLanguage.
     * GET|HEAD /bookLanguages
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $bookLanguages = $this->bookLanguageRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $bookLanguages->toArray(),
            'Book Languages retrieved successfully.',
            $this->getTotalRecords(BookLanguage::class, $input, $bookLanguages)
        );
    }

    /**
     * Store a newly created BookLanguage in storage.
     * POST /bookLanguages
     *
     * @param  CreateBookLanguageAPIRequest  $request
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
     * @param  BookLanguage  $bookLanguage
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
     * @param  BookLanguage  $bookLanguage
     * @param  UpdateBookLanguageAPIRequest  $request
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
     * @param  BookLanguage  $bookLanguage
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookLanguage $bookLanguage)
    {
        if (! empty($bookLanguage->bookItems->toArray())) {
            throw new BadRequestHttpException('Book Language can not be delete, it is used in one or more book items.');
        }
        $bookLanguage->delete();

        return $this->sendResponse($bookLanguage, 'Book Language deleted successfully.');
    }
}
