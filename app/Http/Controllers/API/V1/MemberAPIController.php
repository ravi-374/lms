<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateMemberProfileRequest;
use App\Models\Member;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MemberController
 */
class MemberAPIController extends AppBaseController
{
    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getLoggedInMemberDetails(Request $request)
    {
        /** @var Member $member */
        $member = $request->user();
        $member->address;
        $member->membershipPlan;

        return $this->sendResponse($member, 'Member details retrieved successfully.');
    }

    /**
     * @param  UpdateMemberProfileRequest  $request
     * @param  MemberRepositoryInterface  $memberRepository
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function updateMemberProfile(
        UpdateMemberProfileRequest $request,
        MemberRepositoryInterface $memberRepository
    ) {
        $input = $request->all();
        unset($input['email']);
        unset($input['membership_plan_id']);

        $updateMember = $memberRepository->update($input, Auth::id());

        return $this->sendResponse($updateMember->toArray(), 'Member profile updated successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function removeImage(Request $request)
    {
        /** @var Member $member */
        $member = $request->user();
        $member->deleteMemberImage();

        return $this->sendSuccess('Member image removed successfully.');
    }
}
