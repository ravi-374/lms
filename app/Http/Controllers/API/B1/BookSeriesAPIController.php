<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateBookSeriesAPIRequest;
use App\Http\Requests\API\UpdateBookSeriesAPIRequest;
use App\Models\BookSeries;
use BookSeriesRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookSeriesAPIController
 * @package App\Http\Controllers\API
 */
class BookSeriesAPIController extends AppBaseController
{
    /** @var  BookSeriesRepositoryInterface */
    private $bookSeriesRepository;

    public function __construct(BookSeriesRepositoryInterface $bookSeriesRepo)
    {
        $this->bookSeriesRepository = $bookSeriesRepo;
    }

    /**
     * Display a listing of the BookSeries.
     * GET|HEAD /bookSeries
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $bookSeries = $this->bookSeriesRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($bookSeries->toArray(), 'Book Series retrieved successfully.');
    }

    /**
     * Store a newly created BookSeries in storage.
     * POST /bookSeries
     *
     * @param CreateBookSeriesAPIRequest $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function store(CreateBookSeriesAPIRequest $request)
    {
        $input = $request->all();

        $bookSeries = $this->bookSeriesRepository->store($input);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series saved successfully.');
    }

    /**
     * Display the specified BookSeries.
     * GET|HEAD /bookSeries/{id}
     *
     * @param BookSeries $bookSeries
     *
     * @return JsonResponse
     */
    public function show(BookSeries $bookSeries)
    {
        $bookSeries->seriesItems;

        return $this->sendResponse($bookSeries->toArray(), 'Book Series retrieved successfully.');
    }

    /**
     * Update the specified BookSeries in storage.
     * PUT/PATCH /bookSeries/{id}
     *
     * @param BookSeries $bookSeries
     * @param UpdateBookSeriesAPIRequest $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function update(BookSeries $bookSeries, UpdateBookSeriesAPIRequest $request)
    {
        $input = $request->all();

        $bookSeries = $this->bookSeriesRepository->update($input, $bookSeries->id);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series updated successfully.');
    }

    /**
     * Remove the specified BookSeries from storage.
     * DELETE /bookSeries/{id}
     *
     * @param BookSeries $bookSeries
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookSeries $bookSeries)
    {
        $bookSeries->delete();

        return $this->sendResponse($bookSeries, 'Book Series deleted successfully.');
    }
}
