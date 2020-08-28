<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookItem;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookItemAPIController
 */
class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepositoryInterface */
    private $bookItemRepo;

    public function __construct(BookItemRepositoryInterface $bookItemRepo)
    {
        $this->bookItemRepo = $bookItemRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function searchBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $input['withCount'] = 1;

        $records = $this->bookItemRepo->searchBooks(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiObj();
        });

        return $this->sendResponse($records, 'BookItem retrieved successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getEBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookItemRepo->searchEBooks(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $input['withCount'] = 1;
        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiEBookResponse();
        });

        return $this->sendResponse($records, 'BookItem retrieved successfully.',
            ['totalRecords' => $this->bookItemRepo->searchEBooks($input)]
        );
    }
}
