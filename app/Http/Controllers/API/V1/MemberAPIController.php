<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateMemberProfileAPIRequest;
use App\Models\Member;
use App\Repositories\Contracts\MemberRepositoryInterFace;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Class MemberController
 */
class MemberAPIController extends AppBaseController
{
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
     * @param  UpdateMemberProfileAPIRequest  $request
     * @param  MemberRepositoryInterFace  $memberRepository
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return JsonResponse
     */
    public function updateMemberProfile(
        UpdateMemberProfileAPIRequest $request,
        MemberRepositoryInterFace $memberRepository
    ) {
        $input = $request->all();
        unset($input['email']);
        unset($input['membership_plan_id']);

        $updateMember = $memberRepository->update($input, Auth::id());

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
