<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 11:17 AM
 */

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\AuthRepository;
use Illuminate\Http\JsonResponse;
class AuthAPIController extends AppBaseController
{
    /** @var AuthRepository $authRepo */
    private $authRepo;

    public function __construct(AuthRepository $authRepo)
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

