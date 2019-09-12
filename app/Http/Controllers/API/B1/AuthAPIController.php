<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\AuthRepositoryInterface;
use Illuminate\Http\JsonResponse;

/**
 * Class AuthAPIController
 */
class AuthAPIController extends AppBaseController
{
    /** @var AuthRepositoryInterface $authRepo */
    private $authRepo;

    public function __construct(AuthRepositoryInterface $authRepo)
    {
        $this->authRepo = $authRepo;
    }

    /**
     * @return JsonResponse
     */
    public function getAppConfig()
    {
        $config = $this->authRepo->getAppConfig();

        return $this->sendResponse($config, 'Config retrieved successfully.');
    }
}

