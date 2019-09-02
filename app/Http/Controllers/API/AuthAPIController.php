<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Member;
use App\Models\Setting;
use App\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JWTAuth;

class AuthAPIController extends AppBaseController
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (empty($email) or empty($password)) {
            return $this->sendError('username and password required', 422);
        }

        /** @var User $user */
        $user = User::whereRaw('lower(email) = ?', [$email])->first();
        if (empty($user)) {
            return $this->sendError('Invalid username or password', 422);
        }

        if (!Hash::check($password, $user->password)) {
            return $this->sendError('Invalid username or password', 422);
        }

        if (!$user->is_active) {
            return $this->sendError('Your account is not active', 401);
        }

        $token = JWTAuth::fromUser($user);

        return $this->sendResponse(['token' => $token, 'user' => $user], 'Logged in successfully.');
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function memberLogin(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (empty($email) or empty($password)) {
            return $this->sendError('email and password required.', 422);
        }

        /** @var Member $member */
        $member = Member::whereRaw('lower(email) = ?', [$email])->first();
        if (empty($member)) {
            return $this->sendError('Invalid email or password.', 422);
        }

        if (!Hash::check($password, $member->password)) {
            return $this->sendError('Invalid email or password.', 422);
        }

        if (!$member->is_active) {
            return $this->sendError('Your account is not active', 401);
        }

        $token = JWTAuth::fromUser($member);

        return $this->sendResponse(['token' => $token, 'user' => $member], 'Logged in successfully.');
    }

    /**
     * @return JsonResponse
     */
    public function getLibraryDetails()
    {
        $settings = Setting::whereIn('key', [Setting::LIBRARY_LOGO, Setting::LIBRARY_NAME])->get();

        return $this->sendResponse($settings->toArray(), 'Library details retrieved successfully.');
    }
}