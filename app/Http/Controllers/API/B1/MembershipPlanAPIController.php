<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateMembershipPlanAPIRequest;
use App\Http\Requests\API\UpdateMembershipPlanAPIRequest;
use App\Models\MembershipPlan;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class MembershipPlanController
 * @package App\Http\Controllers\API\B1
 */
class MembershipPlanAPIController extends AppBaseController
{
    /** @var  MembershipPlanRepositoryInterface */
    private $membershipPlanRepoInterface;

    public function __construct(MembershipPlanRepositoryInterface $membershipPlanRepoInterface)
    {
        $this->membershipPlanRepoInterface = $membershipPlanRepoInterface;
    }

    /**
     * Display a listing of the MembershipPlan.
     * GET|HEAD /membershipPlans
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $membershipPlans = $this->membershipPlanRepoInterface->all(
            $request->except(['skip', 'limit']),
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($membershipPlans->toArray(), 'Membership Plans retrieved successfully.');
    }

    /**
     * Store a newly created MembershipPlan in storage.
     * POST /membershipPlans
     *
     * @param CreateMembershipPlanAPIRequest $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateMembershipPlanAPIRequest $request)
    {
        $input = $request->all();

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->membershipPlanRepoInterface->store($input);

        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan saved successfully.');
    }

    /**
     * Display the specified MembershipPlan.
     * GET|HEAD /membershipPlans/{id}
     *
     * @param MembershipPlan $membershipPlan
     *
     * @return JsonResponse
     */
    public function show(MembershipPlan $membershipPlan)
    {
        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan retrieved successfully.');
    }

    /**
     * Update the specified MembershipPlan in storage.
     * PUT/PATCH /membershipPlans/{id}
     *
     * @param MembershipPlan $membershipPlan
     * @param UpdateMembershipPlanAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(MembershipPlan $membershipPlan, UpdateMembershipPlanAPIRequest $request)
    {
        $input = $request->all();

        $membershipPlan = $this->membershipPlanRepoInterface->update($input, $membershipPlan->id);

        return $this->sendResponse($membershipPlan->toArray(), 'Membership Plan updated successfully.');
    }

    /**
     * Remove the specified MembershipPlan from storage.
     * DELETE /membershipPlans/{id}
     *
     * @param MembershipPlan $membershipPlan
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(MembershipPlan $membershipPlan)
    {
        if (!empty($membershipPlan->member)) {
            throw new BadRequestHttpException('Membership Plan can not be delete, it is assigned to one or more members.');
        }
        $membershipPlan->delete();

        return $this->sendResponse($membershipPlan, 'Membership Plan deleted successfully.');
    }
}
