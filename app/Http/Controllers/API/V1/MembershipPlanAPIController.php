<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\API\CreateMembershipPlanAPIRequest;
use App\Http\Requests\API\UpdateMembershipPlanAPIRequest;
use App\Models\MembershipPlan;
use App\Repositories\MembershipPlanRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class MembershipPlanController
 * @package App\Http\Controllers\API
 */
class MembershipPlanAPIController extends AppBaseController
{
    /** @var  MembershipPlanRepository */
    private $membershipPlanRepository;

    public function __construct(MembershipPlanRepository $membershipPlanRepo)
    {
        $this->membershipPlanRepository = $membershipPlanRepo;
    }

    /**
     * Display a listing of the MembershipPlan.
     * GET|HEAD /membershipPlans
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $membershipPlans = $this->membershipPlanRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($membershipPlans->toArray(), 'Membership Plans retrieved successfully.');
    }

    /**
     * Store a newly created MembershipPlan in storage.
     * POST /membershipPlans
     *
     * @param CreateMembershipPlanAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateMembershipPlanAPIRequest $request)
    {
        $input = $request->all();

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->membershipPlanRepository->store($input);

        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan saved successfully.');
    }

    /**
     * Display the specified MembershipPlan.
     * GET|HEAD /membershipPlans/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->membershipPlanRepository->find($id);

        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan retrieved successfully.');
    }

    /**
     * Update the specified MembershipPlan in storage.
     * PUT/PATCH /membershipPlans/{id}
     *
     * @param int $id
     * @param UpdateMembershipPlanAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateMembershipPlanAPIRequest $request)
    {
        $input = $request->all();

        $membershipPlan = $this->membershipPlanRepository->update($input, $id);

        return $this->sendResponse($membershipPlan->toArray(), 'MembershipPlan updated successfully.');
    }

    /**
     * Remove the specified MembershipPlan from storage.
     * DELETE /membershipPlans/{id}
     *
     * @param int $id
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->membershipPlanRepository->findOrFail($id);

        $membershipPlan->delete();

        return $this->sendResponse($id, 'Membership Plan deleted successfully.');
    }
}
