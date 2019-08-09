<?php

namespace App\Http\Controllers\API\B1;

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

    /** @var  UserRepository */
    private $userRepository;

    public function __construct(MemberRepository $memberRepo, UserRepository $userRepository)
    {
        $this->memberRepository = $memberRepo;
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the Member.
     * GET|HEAD /members
     *
     * @param Request $request
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
     * @param CreateMemberAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateMemberAPIRequest $request)
    {
        $input = $request->all();

        $member = $this->memberRepository->store($input);

        return $this->sendResponse($member->toArray(), 'Member saved successfully.');
    }

    /**
     * Display the specified Member.
     * GET|HEAD /members/{id}
     *
     * @param Member $member
     *
     * @return JsonResponse
     */
    public function show(Member $member)
    {
        $member->address;

        return $this->sendResponse($member->toArray(), 'Member retrieved successfully.');
    }

    /**
     * Update the specified Member in storage.
     * PUT/PATCH /members/{id}
     *
     * @param Member $member
     * @param UpdateMemberAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function update(Member $member, UpdateMemberAPIRequest $request)
    {
        $input = $request->all();
        unset($input['email']);

        $member = $this->memberRepository->update($input, $member->id);

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * Remove the specified Member from storage.
     * DELETE /members/{id}
     *
     * @param Member $member
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
     * @param Member $member
     *
     * @return JsonResponse
     */
    public function updateStatus(Member $member)
    {
        $member->is_active = ($member->is_active) ? 0 : 1;
        $member->save();

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * @param Member $member
     *
     * @return JsonResponse
     */
    public function removeImage(Member $member)
    {
        $member->deleteMemberImage();

        return $this->sendSuccess('member image removed successfully.');
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
        unset($input['email']);

        $updateMember = $this->memberRepository->update($input, Auth::id());

        return $this->sendResponse($updateMember->toArray(), 'Member profile updated successfully.');
    }
}
