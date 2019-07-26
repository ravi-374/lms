<?php
namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateSeriesBookAPIRequest;
use App\Http\Requests\API\UpdateSeriesBookAPIRequest;
use App\Models\SeriesBook;
use App\Repositories\SeriesBookRepository;
use Exception;
use Illuminate\Http\JsonResponse;
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
     *
     * @return JsonResponse
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
     * @return JsonResponse
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
     * @param SeriesBook $seriesBook
     *
     * @return JsonResponse
     */
    public function show(SeriesBook $seriesBook)
    {
        return $this->sendResponse($seriesBook->toArray(), 'Series Book retrieved successfully.');
    }

    /**
     * Update the specified SeriesBook in storage.
     * PUT/PATCH /series-book/{id}
     *
     * @param SeriesBook $seriesBook
     * @param UpdateSeriesBookAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(SeriesBook $seriesBook, UpdateseriesBookAPIRequest $request)
    {
        $input = $request->all();

        $seriesBook = $this->seriesBookRepository->update($input, $seriesBook->id);

        return $this->sendResponse($seriesBook->toArray(), 'Series Book updated successfully.');
    }

    /**
     * Remove the specified seriesBook from storage.
     * DELETE series-book/{id}
     *
     * @param SeriesBook $seriesBook
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(SeriesBook $seriesBook)
    {
        $seriesBook->delete();

        return $this->sendResponse($seriesBook, 'Series Book deleted successfully.');
    }
}
