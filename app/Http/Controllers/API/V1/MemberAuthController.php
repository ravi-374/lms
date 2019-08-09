<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Models\Member;
use App\Repositories\AccountRepository;
use App\Repositories\MemberRepository;
use App\Repositories\UserRepository;
use App\User;
use Crypt;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use JWTAuth;
use Session;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use URL;
use Validator;

/**
 * Class MemberAuthController
 * @package App\Http\Controllers\API\B1
 */
class MemberAuthController extends AppBaseController
{
    /** @var  MemberRepository */
    private $memberRepository;

    /** @var  UserRepository */
    private $userRepository;

    /** @var AccountRepository */
    private $accountRepo;

    public function __construct(
        MemberRepository $memberRepo,
        UserRepository $userRepository,
        AccountRepository $accountRepo
    ) {
        $this->memberRepository = $memberRepo;
        $this->userRepository = $userRepository;
        $this->accountRepo = $accountRepo;
    }

    /**
     * @param Request $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'email'      => 'required|unique:members|max:255',
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'password'   => 'required|string|max:255|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->first();

            return $this->sendError($errors, 422);
        }

        $input['activation_code'] = uniqid();
        $member = $this->memberRepository->storeMember($input);

        $token = JWTAuth::fromUser($member);

        $accountRepository = new AccountRepository();
        $name = $member->first_name.' '.$member->last_name;

        $key = $member->id.'|'.$member->activation_code;
        $code = Crypt::encrypt($key);
        $accountRepository->sendConfirmEmail(
            $name,
            $member->email,
            $code
        );

        return $this->sendResponse(['token' => $token, 'user' => $member], 'Registered successfully.');
    }

    /**
     * @return JsonResponse|RedirectResponse|Redirector
     */
    public function verifyAccount()
    {
        $token = \Request::get('token', null);
        if (empty($token)) {
            Session::flash('error', 'token not found.');

            //Todo: add proper redirect once all set up eg. return redirect('login');
            return $this->sendError('token not found.');
        }
        try {
            $token = Crypt::decrypt($token);
            list($memberId, $activationCode) = $result = explode('|', $token);
            if (count($result) < 2) {
                Session::flash('error', 'token not found.');

                //Todo: add proper redirect once all set up eg. return redirect('login');
                return $this->sendError('token not found.');
            }
            /** @var Member $member */
            $member = Member::whereActivationCode($activationCode)->findOrFail($memberId);
            if (empty($member)) {
                Session::flash('msg', 'This account activation token is invalid.');

                //Todo: add proper redirect once all set up eg. return redirect('login');
                return $this->sendError('This account activation token is invalid.');
            }
            $member->is_active = 1;
            $member->save();

            return $this->sendSuccess('Your account has been activated successfully.');
        } catch (Exception $e) {
            Session::flash('msg', 'Something went wrong.');

            //Todo: add proper redirect once all set up eg. return redirect('login');
            return $this->sendError('Something went wrong.');
        }
    }

    /**
     * @param Request $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function sendResetPasswordLink(Request $request)
    {
        $request->validate(['email' => 'required', 'url' => 'required']);

        $url = $request->url;
        $data = [];
        /** @var User $member */
        $member = Member::whereEmail($request->get('email'))->first();
        if (!$member) {
            throw new UnprocessableEntityHttpException('Given Email does not exist in our system.');
        }
        $key = $member->email.'|'.date('Y-m-d H:i:s');
        $token = Crypt::encrypt($key);
        $encodedToken = urlencode($token);
        $data['token'] = $encodedToken;
        $data['link'] = $url .'?token='. $encodedToken;
        $data['first_name'] = $member->first_name;
        $data['last_name'] = $member->last_name;
        $data['email'] = $member->email;

        $this->accountRepo->sendResetPasswordLinkMail($data);

        return $this->sendSuccess('Password reset link sent successfully.');
    }

    /**
     * @param Request $request
     *
     * @return bool|JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $request->validate(['token' => 'required', 'password' => 'required']);

        $input = $request->all();
        $token = Crypt::decrypt($input['token']);
        list($email, $registerTime) = explode('|', $token);

        $member = Member::whereEmail($email)->first();
        if (!$member) {
            return $this->sendError('User with given email not available.');
        }

        //check activated link has expired in 1 hour
        if ((strtotime(date('Y-m-d H:i:s')) - strtotime($registerTime)) / (60 * 60) > 1) {
            return $this->sendError('The activate link has expired.');
        }

        $member->update(['password' => Hash::make($input['password'])]);

        return $this->sendSuccess('Password updated successfully.');
    }
}
