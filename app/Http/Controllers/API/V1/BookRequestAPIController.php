<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ApplyBookRequest;
use App\Models\BookRequest;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
        $input['member_id'] = Auth::id();

        $records = $this->bookRequestRepository->all(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($records, 'Requested books retrieved successfully.');
    }

    /**
     * @param  ApplyBookRequest  $request
     *
     * @return JsonResponse
     */
    public function store(ApplyBookRequest $request)
    {
        $input = $request->all();
        $input['member_id'] = Auth::id();

        $bookRequest = $this->bookRequestRepository->store($input);

        return $this->sendResponse($bookRequest, 'Book requested successfully.');
    }

    /**
     * @param  BookRequest  $bookRequest
     * @param  ApplyBookRequest  $request
     *
     * @return JsonResponse
     */
    public function update(BookRequest $bookRequest, ApplyBookRequest $request)
    {
        BookRequest::whereMemberId(Auth::id())->findOrFail($bookRequest->id);
        $input = $request->all();
        $input['member_id'] = Auth::id();

        $bookRequest = $this->bookRequestRepository->update($input, $bookRequest->id);

        return $this->sendResponse($bookRequest, 'Book requested updated successfully.');
    }

    /**
     * @param  BookRequest  $bookRequest
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookRequest $bookRequest)
    {
        $bookRequest->delete();

        return $this->sendSuccess('Book requested deleted successfully.');
    }
}