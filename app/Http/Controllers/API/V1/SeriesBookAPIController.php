<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateSeriesBookAPIRequest;
use App\Http\Requests\API\UpdateSeriesBookAPIRequest;
use App\Models\SeriesBook;
use App\Repositories\SeriesBookRepository;
use Illuminate\Http\Request;

/**
 * Class SeriesBookAPIController
 * @package App\Http\Controllers\API
 */

class SeriesBookAPIController extends AppBaseController
{
    /** @var  SeriesBookRepository */
    private $seriesBookRepository;

    public function __construct(SeriesBookRepository $seriesBookRepo)
    {
        $this->seriesBookRepository = $seriesBookRepo;
    }

    /**
     * Display a listing of the SeriesBook.
     * GET|HEAD /series-books
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $seriesBook = $this->seriesBookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($seriesBook->toArray(), 'Series Book retrieved successfully.');
    }

    /**
     * Store a newly created SeriesBook in storage.
     * POST /series-book
     *
     * @param CreateSeriesBookAPIRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateSeriesBookAPIRequest $request)
    {
        $input = $request->all();

        $seriesBook = $this->seriesBookRepository->create($input);

        return $this->sendResponse($seriesBook->toArray(), 'Series Book saved successfully.');
    }

    /**
     * Display the specified SeriesBook.
     * GET|HEAD /series-book/{id}
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        /** @var SeriesBook $seriesBook */
        $seriesBook = $this->seriesBookRepository->findOrFail($id);

        return $this->sendResponse($seriesBook->toArray(), 'Series Book retrieved successfully.');
    }

    /**
     * Update the specified SeriesBook in storage.
     * PUT/PATCH /series-book/{id}
     *
     * @param int $id
     * @param UpdateSeriesBookAPIRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateseriesBookAPIRequest $request)
    {
        $input = $request->all();

        $this->seriesBookRepository->findOrFail($id);

        $seriesBook = $this->seriesBookRepository->update($input, $id);

        return $this->sendResponse($seriesBook->toArray(), 'Series Book updated successfully.');
    }

    /**
     * Remove the specified seriesBook from storage.
     * DELETE series-book/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        /** @var SeriesBook $seriesBook */
        $seriesBook = $this->seriesBookRepository->findOrFail($id);

        $seriesBook->delete();

        return $this->sendResponse($id, 'Series Book deleted successfully.');
    }
}
