<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateMemberAPIRequest;
use App\Http\Requests\API\UpdateMemberAPIRequest;
use App\Http\Requests\API\UpdateMemberProfileAPIRequest;
use App\Models\Member;
use App\Repositories\MemberRepository;
use App\Repositories\UserRepository;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MemberController
 * @package App\Http\Controllers\API
 */
class MemberAPIController extends AppBaseController
{
    /** @var  MemberRepository */
    private $memberRepository;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepository = $memberRepo;
    }

    /**
     * @return JsonResponse
     */
    public function getLoggedInMemberDetails()
    {
        $member = Auth::user();

        return $this->sendResponse($member, 'Member details retrieved successfully.');
    }

    /**
     * @param UpdateMemberProfileAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return JsonResponse
     */
    public function updateMemberProfile(UpdateMemberProfileAPIRequest $request)
    {
        $input = $request->all();

        $updateMember = $this->memberRepository->update($input, Auth::id());

        return $this->sendResponse($updateMember->toArray(), 'Member profile updated successfully.');
    }
}
