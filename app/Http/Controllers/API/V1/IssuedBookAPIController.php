<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateIssuedBookAPIRequest;
use App\Http\Requests\API\UpdateIssuedBookAPIRequest;
use App\Models\IssuedBook;
use App\Repositories\BookRepository;
use App\Repositories\IssuedBookRepository;
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
     * Display a listing of the IssuedBook.
     * GET|HEAD /issuedBooks
     *
     * @param  Request  $request
     * @return Response
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
     * POST /issuedBooks
     *
     * @param  int  $reservedBookId
     * @return Response
     * @throws \Exception
     */
    public function issueBook($reservedBookId)
    {
        $issuedBook = $this->issuedBookRepository->updateStatus($reservedBookId, IssuedBook::STATUS_ISSUED);

        return $this->sendResponse($issuedBook->toArray(), 'Book issued successfully.');
    }

    /**
     * Store a newly created IssuedBook in storage.
     * POST /issuedBooks
     *
     * @param  int  $bookId
     * @param  CreateIssuedBookAPIRequest  $request
     *
     * @return Response
     */
    public function reserveBook($bookId, CreateIssuedBookAPIRequest $request)
    {
        $this->bookRepository->findOrFail($bookId);

        $input = $request->all();

        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['book_id'] = $bookId;

        $reservedBook = $this->issuedBookRepository->store($input);

        return $this->sendResponse($reservedBook->toArray(), 'Book reserved saved successfully');
    }

    /**
     * Display the specified IssuedBook.
     * GET|HEAD /issuedBooks/{id}
     *
     * @param  int  $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepository->findOrFail($id);

        return $this->sendResponse($issuedBook->toArray(), 'Issued Book retrieved successfully');
    }

    /**
     * Update the specified IssuedBook in storage.
     * PUT/PATCH /issuedBooks/{id}
     *
     * @param  int  $id
     * @param  UpdateIssuedBookAPIRequest  $request
     *
     * @return Response
     */
    public function update($id, UpdateIssuedBookAPIRequest $request)
    {
        $input = $request->all();

        $this->issuedBookRepository->findOrFail($id);

        $issuedBook = $this->issuedBookRepository->update($input, $id);

        return $this->sendResponse($issuedBook->toArray(), 'IssuedBook updated successfully');
    }

    /**
     * Remove the specified IssuedBook from storage.
     * DELETE /issuedBooks/{id}
     *
     * @param  int  $id
     *
     * @return Response
     * @throws \Exception
     *
     */
    public function destroy($id)
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepository->findOrFail($id);

        $issuedBook->delete();

        return $this->sendResponse($id, 'Issued Book deleted successfully');
    }
}
