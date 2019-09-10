<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateIssuedBookAPIRequest;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class IssuedBookController
 * @package App\Http\Controllers\API
 */
class IssuedBookAPIController extends AppBaseController
{
    /** @var  IssuedBookRepositoryInterface */
    private $issuedBookRepoInterface;

    public function __construct(IssuedBookRepositoryInterface $issuedBookRepoInterface)
    {
        $this->issuedBookRepoInterface = $issuedBookRepoInterface;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $issuedBooks = $this->issuedBookRepoInterface->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $issuedBooks = $issuedBooks->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        return $this->sendResponse(
            $issuedBooks,
            'Issued Books retrieved successfully.',
            $this->getTotalRecords(IssuedBook::class, $input, $issuedBooks)
        );
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

        $result = $this->issuedBookRepoInterface->issueBook($input);

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

        $result = $this->issuedBookRepoInterface->reserveBook($input);

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

        $result = $this->issuedBookRepoInterface->returnBook($input);

        return $this->sendResponse($result->apiObj(), 'Book return successfully.');
    }

    /**
     * @param BookItem $bookItem
     * @param Request $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function updateIssuedBookStatus(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;

        $result = $this->issuedBookRepoInterface->updateIssuedBookStatus($input);

        return $this->sendResponse($result->apiObj(), 'Issued Book status updated successfully.');
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
        $issuedBook->member;
        $bookItem = $issuedBook->bookItem;
        $bookItem->publisher;
        $bookItem->language;
        $book = $bookItem->book;
        $book->genres;
        $book->authors;
        $book->tags;

        return $this->sendResponse($issuedBook->apiObj(), 'Issued Book retrieved successfully.');
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

        $this->issuedBookRepoInterface->findOrFail($id);

        $issuedBook = $this->issuedBookRepoInterface->update($input, $id);

        return $this->sendResponse($issuedBook->toArray(), 'Issued Book updated successfully.');
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
        $issuedBook = $this->issuedBookRepoInterface->findOrFail($id);

        $issuedBook->delete();

        return $this->sendResponse($id, 'Issued Book deleted successfully.');
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

        $records = $this->issuedBookRepoInterface->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        $totalRecords = (!empty($search['search'])) ? count($records) : IssuedBook::ofMember($search['member_id'])->count();

        return $this->sendResponse(
            $records,
            'Books history retrieved successfully.',
            ['totalRecords' => $totalRecords]
        );
    }

    /**
     * @param BookItem $bookItem
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function unReserveBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $result = $this->issuedBookRepoInterface->unReserveBook($bookItem, $input);

        return $this->sendResponse($result->apiObj(), 'Book un-reserved successfully.');
    }
}
