<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Models\Member;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthAPIController extends AppBaseController
{
    /**
     * @param  Request  $request
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

        if (! Hash::check($password, $member->password)) {
            return $this->sendError('Invalid email or password.', 422);
        }

        if (! $member->email_verified_at) {
            return $this->sendError('Please verify your email.', 401);
        }

        if (! $member->is_active) {
            return $this->sendError('Your account is not active', 401);
        }

        $token = $member->createToken('member_token')->plainTextToken;

        return $this->sendResponse(['token' => $token, 'user' => $member], 'Logged in successfully.');
    }
}
