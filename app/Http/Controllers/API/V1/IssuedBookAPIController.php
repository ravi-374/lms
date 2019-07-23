<?php
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateIssuedBookAPIRequest;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\BookItemRepository;
use App\Repositories\IssuedBookRepository;
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
    public function index(Request $request)
    {
        $issuedBooks = $this->issuedBookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        $issuedBooks = $issuedBooks->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        return $this->sendResponse($issuedBooks, 'Issued Books retrieved successfully');
    }

    /**
     * @param BookItem $bookItem
     * @param Request $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function issueBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;

        $result = $this->issuedBookRepository->issueBook($input);

        return $this->sendResponse($result->apiObj(), 'Book issued successfully.');
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

        $result = $this->issuedBookRepository->reserveBook($input);

        return $this->sendResponse($result->apiObj(), 'Book reserved successfully.');
    }

    /**
     * @param BookItem $bookItem
     * @param Request $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function returnBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;

        $result = $this->issuedBookRepository->returnBook($input);

        return $this->sendResponse($result->apiObj(), 'Book return successfully.');
    }

    /**
     * @param IssuedBook $issuedBook
     *
     * @return JsonResponse
     */
    public function show(IssuedBook $issuedBook)
    {
        $issuedBook->issuer;
        $issuedBook->returner;
        $issuedBook->bookItem->book;

        return $this->sendResponse($issuedBook->apiObj(), 'Issued Book retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateIssuedBookAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update($id, UpdateIssuedBookAPIRequest $request)
    {
        $input = $request->all();

        $this->issuedBookRepository->findOrFail($id);

        $issuedBook = $this->issuedBookRepository->update($input, $id);

        return $this->sendResponse($issuedBook->toArray(), 'Issued Book updated successfully');
    }

    /**
     * @param int $id
     *
     * @throws Exception
     *
     * @return JsonResponse
     *
     */
    public function destroy($id)
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepository->findOrFail($id);

        $issuedBook->delete();

        return $this->sendResponse($id, 'Issued Book deleted successfully');
    }

    /**
     * @param Member $member
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function memberBooksHistory(Member $member, Request $request)
    {
        $search = $request->all();
        $search['member_id'] = $member->id;

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
}
