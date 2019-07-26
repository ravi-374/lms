<?php
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateIssuedBookAPIRequest;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Repositories\BookItemRepository;
use App\Repositories\IssuedBookRepository;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class IssuedBookController
 * @package App\Http\Controllers\API
 */
class IssuedBookAPIController extends AppBaseController
{
    /** @var  IssuedBookRepository */
    private $issuedBookRepository;

    /** @var BookItemRepository */
    private $bookItemRepo;

    public function __construct(IssuedBookRepository $issuedBookRepo, BookItemRepository $bookItemRepo)
    {
        $this->issuedBookRepository = $issuedBookRepo;
        $this->bookItemRepo = $bookItemRepo;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function booksHistory(Request $request)
    {
        $search = $request->all();
        $search['member_id'] = Auth::id();

        $records = $this->issuedBookRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        return $this->sendResponse($records, 'Books history retrieved successfully.');
    }

    /**
     * @param BookItem $bookItem
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function reserveBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['book_item_id'] = $bookItem->id;
        $input['member_id'] = Auth::id();

        $result = $this->issuedBookRepository->reserveBook($input);

        return $this->sendResponse($result->apiObj(), 'Book reserved successfully.');
    }

    /**
     * @param BookItem $bookItem
     *
     * @return JsonResponse
     */
    public function unReserveBook(BookItem $bookItem)
    {
        $input['member_id'] = Auth::id();
        $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);

        return $this->sendResponse($result->apiObj(), 'Book un-reserved successfully.');
    }
}
