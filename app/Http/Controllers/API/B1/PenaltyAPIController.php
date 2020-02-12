<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\IssuedBook;
use App\Repositories\Contracts\PenaltyRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PenaltyAPIController
 */
class PenaltyAPIController extends AppBaseController
{
    /** @var PenaltyRepositoryInterface $penaltyRepo */
    private $penaltyRepo;

    /**
     * PenaltyAPIController constructor.
     * @param  PenaltyRepositoryInterface  $penaltyRepo
     */
    public function __construct(PenaltyRepositoryInterface $penaltyRepo)
    {
        $this->penaltyRepo = $penaltyRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $penalties = $this->penaltyRepo->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $penalties->toArray(),
            'Penalties retrieved successfully.',
            ['totalRecords' => $this->penaltyRepo->all($input)->count()]
        );
    }

    /**
     * @param int $bookItemId
     *
     * @return JsonResponse
     */
    public function calculatePenaltyAmount($bookItemId)
    {
        $penalty = $this->penaltyRepo->calculatePenaltyAmount($bookItemId);

        return $this->sendResponse($penalty, 'Penalty amount calculated successfully.');
    }
}
