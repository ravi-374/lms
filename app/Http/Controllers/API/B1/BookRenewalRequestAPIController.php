<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookRenewalRequest;
use App\Repositories\Contracts\BookRenewalRequestRepositoryInterface;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRenewalRequestAPIController
 */
class BookRenewalRequestAPIController extends AppBaseController
{
    /**
     * @var BookRenewalRequestRepositoryInterface
     */
    private $bookRenewalRequestRepository;

    public function __construct(BookRenewalRequestRepositoryInterface $bookRenewalRequestRepository)
    {
        $this->bookRenewalRequestRepository = $bookRenewalRequestRepository;
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
     * @param  BookRenewalRequest  $bookRenewalRequest
     * @param  int  $status
     *
     * @return JsonResponse
     */
    public function updateRequestStatus(BookRenewalRequest $bookRenewalRequest, $status)
    {
        if (! in_array($status, [BookRenewalRequest::APPROVED, BookRenewalRequest::CANCELLED])) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        $this->bookRenewalRequestRepository->updateStatus($bookRenewalRequest, $status);

        return $this->sendSuccess(
            'Renewal renewal request updated successfully.'
        );
    }
}
