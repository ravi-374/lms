<?php
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateMembershipPlanAPIRequest;
use App\Http\Requests\API\UpdateMembershipPlanAPIRequest;
use App\Models\MembershipPlan;
use App\Repositories\MembershipPlanRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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
