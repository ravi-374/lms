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
    public function penaltyCharge(Request $request)
    {
        $input = $request->all();
        if (IssuedBook::STATUS_RETURNED == $input['status']) {
            $data = $this->penaltyRepo->penaltyCharge($input);

            if ($data['collect_penalty']) {
                return $this->sendResponse($data, 'Penalty charge created successfully.');
            }

            return $this->sendResponse($data, 'Book returned before due date.');
        }
    }
}
