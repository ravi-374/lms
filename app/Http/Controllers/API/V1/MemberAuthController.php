<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\Member;
use App\Models\User;
use App\Repositories\AccountRepository;
use App\Repositories\MemberRepository;
use App\Repositories\UserRepository;
use Crypt;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JWTAuth;
use Session;
use Validator;

class MemberAuthController extends AppBaseController
{
    /** @var  MemberRepository */
    private $memberRepository;

    /** @var  UserRepository */
    private $userRepository;

    public function __construct(MemberRepository $memberRepo,UserRepository $userRepository)
    {
        $this->memberRepository = $memberRepo;
        $this->userRepository = $userRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function login(Request $request)
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

        $token = JWTAuth::fromUser($member);

        return $this->sendResponse(['token' => $token, 'user' => $member], 'Logged in successfully.');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \App\Exceptions\ApiOperationFailedException
     */
    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'email' => 'required|unique:members|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'password' => 'required|string|max:255|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->first();
            return $this->sendError($errors, 422);
        }

        $input['activation_code'] = uniqid();
        $member = $this->memberRepository->storeMember($input);

        $token = JWTAuth::fromUser($member);

        $accountRepository = new AccountRepository();
        $name = $member->first_name . ' ' . $member->last_name;

        $key = $member->id . '|' . $member->activation_code;
        $code = Crypt::encrypt($key);
        $accountRepository->sendConfirmEmail(
            $name,
            $member->email,
            $code
        );

        return $this->sendResponse(['token' => $token, 'user' => $member], 'Registered successfully.');
    }

    /**
     * @return JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
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
}
