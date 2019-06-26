<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Requests\API\CreateMemberAPIRequest;
use App\Http\Requests\API\UpdateMemberAPIRequest;
use App\Models\Address;
use App\Models\Member;
use App\Repositories\MemberRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

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

    public function __construct(MemberRepository $memberRepo,UserRepository $userRepository)
    {
        $this->memberRepository = $memberRepo;
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the Member.
     * GET|HEAD /members
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $members = $this->memberRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($members->toArray(), 'Members retrieved successfully.');
    }

    /**
     * Store a newly created Member in storage.
     * POST /members
     * @param CreateMemberAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws \Exception
     * @return JsonResponse
     */
    public function store(CreateMemberAPIRequest $request)
    {
        $input = $request->all();

        $this->userRepository->validateAddress($input);

        $member = $this->memberRepository->store($input);

        return $this->sendResponse($member->toArray(), 'Member saved successfully.');
    }

    /**
     * Display the specified Member.
     * GET|HEAD /members/{id}
     *
     * @param int $id
     *
     * @return JsonResponse
     */
    public function show($id)
    {
        /** @var Member $member */
        $member = $this->memberRepository->find($id);

        return $this->sendResponse($member->toArray(), 'Member retrieved successfully.');
    }

    /**
     * Update the specified Member in storage.
     * PUT/PATCH /members/{id}
     *
     * @param int $id
     * @param UpdateMemberAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws \Exception
     * @return JsonResponse
     */
    public function update($id, UpdateMemberAPIRequest $request)
    {
        $input = $request->all();
        $this->memberRepository->findOrFail($id);
        $this->userRepository->validateAddress($input);

        $member = $this->memberRepository->update($input, $id);

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * Remove the specified Member from storage.
     * DELETE /members/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     * @return JsonResponse
     */
    public function destroy($id)
    {
        /** @var Member $member */
        $member = $this->memberRepository->findOrFail($id);

        $member->deleteMemberImage();
        $member->delete();

        return $this->sendResponse($id, 'Member deleted successfully.');
    }

}
