<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ChangePasswordRequest;
use App\Http\Requests\API\UpdateMemberProfileRequest;
use App\Models\Address;
use App\Models\Member;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Auth;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MemberController
 */
class MemberAPIController extends AppBaseController
{
    /**
     * @param  Request  $request
     *
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
     * @return JsonResponse
     */
    public function updateMemberProfile(
        UpdateMemberProfileRequest $request,
        MemberRepositoryInterface $memberRepository
    )
    {
        try {
            $input = $request->all();
            unset($input['email']);
            unset($input['membership_plan_id']);

            $member = Auth::user();
            $updateMember = $memberRepository->updateMemberProfile($input, Auth::id());
            $result = $updateMember->toArray();

            /** @var Address $address */
            $address = $member->address;
            unset($result['address']);
            if (! empty($address)) {
                $address = $address->apiM1AddressObj();
                $result = array_merge($result, $address);
            }

            return $this->sendResponse($result, 'Member profile updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @param  ChangePasswordRequest  $request
     *
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $input = $request->all();
            $user = Auth::user();

            if (! Hash::check($input['current_password'], $user->password)) {
                return $this->sendError("Invalid current password");
            }

            $user->password = Hash::make($input['password']);
            $user->save();

            return $this->sendSuccess("Password changed successfully");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
