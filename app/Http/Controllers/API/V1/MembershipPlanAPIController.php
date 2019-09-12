<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MembershipPlanController
 */
class MembershipPlanAPIController extends AppBaseController
{
    /** @var  MembershipPlanRepositoryInterface */
    private $membershipPlanRepository;

    public function __construct(MembershipPlanRepositoryInterface $membershipPlanRepo)
    {
        $this->membershipPlanRepository = $membershipPlanRepo;
    }

    /**
     * Display a listing of the MembershipPlan.
     * GET|HEAD /membershipPlans
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $membershipPlans = $this->membershipPlanRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($membershipPlans->toArray(), 'Membership Plans retrieved successfully.');
    }
}
