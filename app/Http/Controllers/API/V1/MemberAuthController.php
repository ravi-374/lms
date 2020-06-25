<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ResetPasswordLinkRequest;
use App\Http\Requests\API\ResetPasswordRequest;
use App\Models\Member;
use App\Models\MembershipPlan;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\MemberRepository;
use App\User;
use Carbon\Carbon;
use Crypt;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Redirect;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Validator;

/**
 * Class MemberAuthController
 */
class MemberAuthController extends AppBaseController
{
    /** @var  MemberRepository */
    private $memberRepository;

    /** @var AccountRepositoryInterface */
    private $accountRepo;

    public function __construct(
        MemberRepositoryInterface $memberRepo,
        AccountRepositoryInterface $accountRepo
    ) {
        $this->memberRepository = $memberRepo;
        $this->accountRepo = $accountRepo;
    }

    /**
     * @param  Request  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
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
            'password'   => 'required|string|max:255|min:8',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->first();

            return $this->sendError($errors, 422);
        }

        $silver = MembershipPlan::whereName('Silver')->first();
        $input['activation_code'] = uniqid();
        $input['membership_plan_id'] = $silver->id;
        $member = $this->memberRepository->storeMember($input);

        $token = $member->createToken('member_token')->plainTextToken;

        return $this->sendResponse(['token' => $token, 'user' => $member], 'Registered successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse|RedirectResponse|Redirector
     */
    public function verifyAccount(Request $request)
    {
        $url = config('app.url');
        $token = $request->get('token', null);
        if (empty($token)) {
            return Redirect::to($url.'/#app/login?success=0&msg=token not found.');
        }

        try {
            $token = Crypt::decrypt($token);
            list($memberId, $activationCode) = $result = explode('|', $token);
            if (count($result) < 2) {
                return Redirect::to($url.'/#app/login?success=0&msg=token not found.');
            }

            /** @var Member $member */
            $member = Member::whereActivationCode($activationCode)->findOrFail($memberId);
            if (empty($member)) {
                return Redirect::to($url.'/#app/login?success=0&msg=This account activation token is invalid.');
            }
            $member->is_active = 1;
            $member->email_verified_at = Carbon::now();
            $member->save();

            return Redirect::to($url.'/#app/login?success=1&msg=Your account has been activated successfully.');
        } catch (Exception $e) {
            return Redirect::to($url.'/#app/login?success=0&msg=Something went wrong.');
        }
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
        $url = $request->get('url');
        $data = [];
        /** @var User $member */
        $member = Member::whereEmail($request->get('email'))->first();
        if (! $member) {
            throw new UnprocessableEntityHttpException('Given Email does not exist in our system.');
        }
        $key = $member->email.'|'.date('Y-m-d H:i:s');
        $token = Crypt::encrypt($key);
        $encodedToken = urlencode($token);
        $data['token'] = $encodedToken;
        $data['link'] = $url.'?token='.$encodedToken;
        $data['first_name'] = $member->first_name;
        $data['last_name'] = $member->last_name;
        $data['email'] = $member->email;

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

        $member = Member::whereEmail($email)->first();
        if (! $member) {
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
