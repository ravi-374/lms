<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\API\CreateBookSeriesAPIRequest;
use App\Http\Requests\API\CreateSeriesBookAPIRequest;
use App\Http\Requests\API\UpdateBookSeriesAPIRequest;
use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\BookSeriesRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class BookSeriesAPIController
 * @package App\Http\Controllers\API
 */

class BookSeriesAPIController extends AppBaseController
{
    /** @var  BookSeriesRepository */
    private $bookSeriesRepository;

    public function __construct(BookSeriesRepository $bookSeriesRepo)
    {
        $this->bookSeriesRepository = $bookSeriesRepo;
    }

    /**
     * Display a listing of the BookSeries.
     * GET|HEAD /bookSeries
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateBookSeriesAPIRequest $request)
    {
        $input = $request->all();

        $bookSeries = $this->bookSeriesRepository->create($input);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series saved successfully.');
    }

    /**
     * Display the specified BookSeries.
     * GET|HEAD /bookSeries/{id}
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = $this->bookSeriesRepository->findOrFail($id);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series retrieved successfully.');
    }

    /**
     * Update the specified BookSeries in storage.
     * PUT/PATCH /bookSeries/{id}
     *
     * @param int $id
     * @param UpdateBookSeriesAPIRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateBookSeriesAPIRequest $request)
    {
        $input = $request->all();

        $this->bookSeriesRepository->findOrFail($id);

        $bookSeries = $this->bookSeriesRepository->update($input, $id);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series updated successfully.');
    }

    /**
     * Remove the specified BookSeries from storage.
     * DELETE /bookSeries/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = $this->bookSeriesRepository->findOrFail($id);

        $bookSeries->delete();

        return $this->sendResponse($id, 'Book Series deleted successfully.');
    }
}
