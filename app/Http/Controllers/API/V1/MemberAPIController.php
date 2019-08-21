<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateMemberProfileAPIRequest;
use App\Models\Member;
use App\Repositories\MemberRepository;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;

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
        /** @var Member $member */
        $member = Auth::user();
        $member->address;
        $member->membershipPlan;

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
        unset($input['email']);
        unset($input['membership_plan']);

        $updateMember = $this->memberRepository->update($input, Auth::id());

        return $this->sendResponse($updateMember->toArray(), 'Member profile updated successfully.');
    }

    /**
     * @return JsonResponse
     */
    public function removeImage()
    {
        /** @var Member $member */
        $member = Auth::user();
        $member->deleteMemberImage();

        return $this->sendSuccess('Member image removed successfully.');
    }
}
