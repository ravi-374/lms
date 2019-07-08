<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateIssuedBookAPIRequest;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Repositories\BookItemRepository;
use App\Repositories\BookRepository;
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

        return $this->sendResponse($issuedBooks->toArray(), 'Issued Books retrieved successfully');
    }

    /**
     * @param int $bookItemId
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Exception
     *
     */
    public function issueBook($bookItemId, Request $request)
    {
        $this->bookItemRepo->findOrFail($bookItemId);
        $input = $request->all();
        $input['book_item_id'] = $bookItemId;

        $result = $this->issuedBookRepository->issueBook($input);

        return $this->sendResponse($result, 'Book issued successfully.');
    }

    /**
     * @param int $bookItemId
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function reserveBook($bookItemId, Request $request)
    {
        $this->bookItemRepo->findOrFail($bookItemId);

        $input = $request->all();
        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['book_item_id'] = $bookItemId;

        $result = $this->issuedBookRepository->reserveBook($input);

        return $this->sendResponse($result, 'Book reserved successfully.');
    }

    /**
     * @param int $bookItemId
     * @param Request $request
     *
     * @return JsonResponse
     *@throws Exception
     *
     */
    public function returnBook($bookItemId, Request $request)
    {
        $this->bookItemRepo->findOrFail($bookItemId);
        $input = $request->all();
        $input['book_item_id'] = $bookItemId;

        $this->issuedBookRepository->returnBook($input);

        return $this->sendSuccess('Book return successfully.');
    }

    /**
     * @param int $id
     *
     * @return JsonResponse
     */
    public function show($id)
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepository->findOrFail($id);

        return $this->sendResponse($issuedBook->toArray(), 'Issued Book retrieved successfully');
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

        return $this->sendResponse($issuedBook->toArray(), 'IssuedBook updated successfully');
    }

    /**
     * @param int$id
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
     * @param int $memberId
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function memberBooksHistory($memberId, Request $request)
    {
        $search = $request->all();
        $search['member_id'] = $memberId;

        $records = $this->issuedBookRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($records->toArray(), 'Books history retrieved successfully.');
    }
}
