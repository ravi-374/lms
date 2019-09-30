<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateMemberRequest;
use App\Http\Requests\API\UpdateMemberRequest;
use App\Models\Member;
use App\Models\MembershipPlan;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MemberController
 */
class MemberAPIController extends AppBaseController
{
    /** @var  MemberRepositoryInterface */
    private $memberRepository;

    public function __construct(MemberRepositoryInterface $memberRepo)
    {
        $this->memberRepository = $memberRepo;
    }

    /**
     * Display a listing of the Member.
     * GET|HEAD /members
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $members = $this->memberRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $members->toArray(),
            'Members retrieved successfully.',
            $this->getTotalRecords(Member::class, $input, $members)
        );
    }

    /**
     * Store a newly created Member in storage.
     * POST /members
     * @param  CreateMemberRequest  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateMemberRequest $request)
    {
        $input = $request->all();

        $member = $this->memberRepository->store($input);

        return $this->sendResponse($member->toArray(), 'Member saved successfully.');
    }

    /**
     * Display the specified Member.
     * GET|HEAD /members/{id}
     *
     * @param  Member  $member
     *
     * @return JsonResponse
     */
    public function show(Member $member)
    {
        $member->address;
        $member->membershipPlan;

        return $this->sendResponse($member->toArray(), 'Member retrieved successfully.');
    }

    /**
     * Update the specified Member in storage.
     * PUT/PATCH /members/{id}
     *
     * @param  Member  $member
     * @param  UpdateMemberRequest  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function update(Member $member, UpdateMemberRequest $request)
    {
        $input = $request->all();

        MembershipPlan::findOrFail($input['membership_plan_id']);

        $member = $this->memberRepository->update($input, $member->id);

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * Remove the specified Member from storage.
     * DELETE /members/{id}
     *
     * @param  Member  $member
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Member $member)
    {
        $member->deleteMemberImage();
        $member->delete();

        return $this->sendResponse($member, 'Member deleted successfully.');
    }

    /**
     * @param  Member  $member
     *
     * @return JsonResponse
     */
    public function updateStatus(Member $member)
    {
        $member->is_active = ($member->is_active) ? 0 : 1;
        $member->save();

        $member->address;
        $member->membershipPlan;

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * @param  Member  $member
     *
     * @return JsonResponse
     */
    public function removeImage(Member $member)
    {
        $member->deleteMemberImage();

        return $this->sendSuccess('Member image removed successfully.');
    }

    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getLoggedInMemberDetails(Request $request)
    {
        $member = $request->user();

        return $this->sendResponse($member, 'Member details retrieved successfully.');
    }
}
