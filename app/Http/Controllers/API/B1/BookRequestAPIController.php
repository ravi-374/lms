<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookRequest;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRequestAPIController
 */
class BookRequestAPIController extends AppBaseController
{
    /**
     * @var BookRequestRepositoryInterface
     */
    private $bookRequestRepository;

    public function __construct(BookRequestRepositoryInterface $bookRequestRepository)
    {
        $this->bookRequestRepository = $bookRequestRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookRequestRepository->all(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($records, 'Requested books retrieved successfully.');
    }

    /**
     * @param  BookRequest  $bookRequest
     * @param  int  $status
     *
     * @return JsonResponse
     */
    public function updateStatus(BookRequest $bookRequest, $status)
    {
        if (! in_array($status, BookRequest::STATUS_ARR)) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        $bookRequest->update(['status' => $status]);

        return $this->sendSuccess('Book request status updated successfully.');
    }
}