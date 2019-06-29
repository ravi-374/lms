<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateIssuedBookAPIRequest;
use App\Http\Requests\API\UpdateIssuedBookAPIRequest;
use App\Models\IssuedBook;
use App\Repositories\BookRepository;
use App\Repositories\IssuedBookRepository;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Response;

/**
 * Class IssuedBookController
 * @package App\Http\Controllers\API
 */
class IssuedBookAPIController extends AppBaseController
{
    /** @var  IssuedBookRepository */
    private $issuedBookRepository;

    /** @var BookRepository */
    private $bookRepository;

    public function __construct(IssuedBookRepository $issuedBookRepo, BookRepository $bookRepository)
    {
        $this->issuedBookRepository = $issuedBookRepo;
        $this->bookRepository = $bookRepository;
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
     * @param int $bookId
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Exception
     *
     */
    public function issueBook($bookId, Request $request)
    {
        $input = $request->all();
        $input['book_id'] = $bookId;
        $this->bookRepository->findOrFail($bookId);

        $issuedBook = $this->issuedBookRepository->updateStatus($input, IssuedBook::STATUS_ISSUED);

        return $this->sendResponse($issuedBook->toArray(), 'Book issued successfully.');
    }

    /**
     * @param int $bookId
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function reserveBook($bookId, Request $request)
    {
        $this->bookRepository->findOrFail($bookId);

        $input = $request->all();
        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['book_id'] = $bookId;

        $reservedBook = $this->issuedBookRepository->store($input);

        return $this->sendResponse($reservedBook->toArray(), 'Book reserved successfully.');
    }

    /**
     * @param int $bookId
     * @param Request $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function returnBook($bookId, Request $request)
    {
        $this->bookRepository->findOrFail($bookId);
        $input = $request->all();
        $input['book_id'] = $bookId;
        $this->bookRepository->findOrFail($bookId);

        $issuedBook = $this->issuedBookRepository->updateStatus($input, IssuedBook::STATUS_RETURNED);

        return $this->sendResponse($issuedBook->toArray(), 'Book return successfully.');
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
