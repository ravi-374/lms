<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateBookRenewalRequestRequest;
use App\Http\Requests\API\UpdateBookRenewalRequestRequest;
use App\Models\BookItem;
use App\Models\BookRenewalRequest;
use App\Models\IssuedBook;
use App\Repositories\Contracts\BookRenewalRequestRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookRenewalRequestAPIController
 */
class BookRenewalRequestAPIController extends AppBaseController
{
    /**
     * @var BookRenewalRequestRepositoryInterface
     */
    private $bookRenewalRequestRepository;
    /**
     * @var IssuedBookRepositoryInterface
     */
    private $issuedBookRepository;

    public function __construct(
        BookRenewalRequestRepositoryInterface $bookRenewalRequestRepository,
        IssuedBookRepositoryInterface $issuedBookRepository
    ) {
        $this->bookRenewalRequestRepository = $bookRenewalRequestRepository;
        $this->issuedBookRepository = $issuedBookRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $search = $request->all();
        $search['member_id'] = Auth::id();
        $search['order_by'] = 'id';
        $search['direction'] = 'desc';

        $records = $this->bookRenewalRequestRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse(
            $records,
            'Renewal books retrieved successfully.'
        );
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function booksForRenewal(Request $request)
    {
        $search = $request->all();
        $search['member_id'] = Auth::id();
        $search['books_for_renewal'] = true;

        $records = $this->issuedBookRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        return $this->sendResponse(
            $records,
            'Renewal books retrieved successfully.'
        );
    }

    /**
     * @param  CreateBookRenewalRequestRequest  $request
     *
     * @return JsonResponse
     */
    public function store(CreateBookRenewalRequestRequest $request)
    {
        $input = $request->all();
        $input['member_id'] = Auth::id();
        $bookRenewalRequest = $this->bookRenewalRequestRepository->store($input);

        return $this->sendResponse($bookRenewalRequest, 'Book renewal request added successfully.');
    }

    /**
     * @param  BookRenewalRequest  $bookRenewalRequest
     * @param  UpdateBookRenewalRequestRequest  $request
     *
     * @return JsonResponse
     */
    public function update(BookRenewalRequest $bookRenewalRequest, UpdateBookRenewalRequestRequest $request)
    {
        $input = $request->all();
        $input['member_id'] = Auth::id();
        $bookRenewalRequest = $this->bookRenewalRequestRepository->update($input, $bookRenewalRequest->id);

        return $this->sendResponse($bookRenewalRequest, 'Book renewal request updated successfully.');
    }

    /**
     * @param  BookRenewalRequest  $bookRenewalRequest
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookRenewalRequest $bookRenewalRequest)
    {
        $bookRenewalRequest->delete();

        return $this->sendSuccess('Book renewal request deleted successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     *
     * @return JsonResponse
     */
    public function renewBook(BookItem $bookItem)
    {
        $issuedBook = $this->bookRenewalRequestRepository->renewBook($bookItem, Auth::id());

        return $this->sendResponse($issuedBook, 'Book renewed successfully.');
    }
}
