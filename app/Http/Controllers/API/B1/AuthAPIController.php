<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\AuthRepositoryInterface;
use App\User;
use Crypt;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

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

    /**
     * @param  Request  $request
     *
     * @return JsonResponse|RedirectResponse|Redirector
     */
    public function verifyAccount(Request $request)
    {
        $token = $request->get('token', null);
        if (empty($token)) {
            return $this->sendError('token not found.');
        }
        try {
            $token = Crypt::decrypt($token);
            list($memberId, $email) = $result = explode('|', $token);

            if (count($result) < 2) {
                return $this->sendError('token not found.');
            }

            /** @var User $user */
            $user = User::whereEmail($email)->findOrFail($memberId);
            if (empty($user)) {
                return $this->sendError('User not found.');
            }
            $user->is_active = 1;
            $user->save();

            return $this->sendSuccess('Your account has been activated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Something went wrong.');
        }
    }
}

