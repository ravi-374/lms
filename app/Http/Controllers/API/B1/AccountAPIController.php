<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 15-07-2019
 * Time: 05:11 PM
 */

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\ResetPasswordLinkRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\User;
use Auth;
use Crypt;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class AccountAPIController
 */
class AccountAPIController extends AppBaseController
{
    /** @var AccountRepositoryInterface */
    private $accountRepo;

    public function __construct(AccountRepositoryInterface $accountRepo)
    {
        $this->accountRepo = $accountRepo;
    }

    /**
     * @param  ResetPasswordLinkRequest  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function sendResetPasswordLink(ResetPasswordLinkRequest $request)
    {
        $input = $request->only(['url']);
        $data = [];
        /** @var User $user */
        $user = User::whereEmail($request->get('email'))->first();
        if (! $user) {
            throw new UnprocessableEntityHttpException('Given Email does not exist in our system.');
        }
        $key = $user->email.'|'.date('Y-m-d H:i:s');
        $token = Crypt::encrypt($key);
        $encodedToken = urlencode($token);
        $data['token'] = $encodedToken;
        $data['link'] = $input['url'].'?token='.$encodedToken;
        $data['first_name'] = $user->first_name;
        $data['last_name'] = $user->last_name;
        $data['email'] = $user->email;

        $this->accountRepo->sendResetPasswordLinkMail($data);

        return $this->sendSuccess('Password reset link sent successfully.');
    }

    /**
     * @param  ResetPasswordRequest  $request
     *
     * @return bool|JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $input = $request->all();
        $token = Crypt::decrypt($input['token']);
        list($email, $registerTime) = explode('|', $token);

        $user = User::whereEmail($email)->first();
        if (! $user) {
            return $this->sendError('User with given email not available.');
        }

        //check activated link has expired in 1 hour
        if ((strtotime(date('Y-m-d H:i:s')) - strtotime($registerTime)) / (60 * 60) > 1) {
            return $this->sendError('The activate link has expired.');
        }

        $user->update(['password' => Hash::make($input['password'])]);

        Auth::login($user);

        return $this->sendSuccess('Password updated successfully.');
    }
}