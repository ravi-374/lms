<?php

namespace App\Repositories;

use App\Models\Member;
use App\Repositories\Contracts\AccountRepositoryInterface;
use Crypt;
use Exception;
use Illuminate\Mail\Message;
use Mail;
use URL;

/**
 * Class AccountRepository
 */
class AccountRepository implements AccountRepositoryInterface
{
    /**
     * @param  Member  $object
     *
     * @throws Exception
     */
    public function sendConfirmEmail($object)
    {
        $name = $object->first_name.' '.$object->last_name;
        $key = $object->id.'|'.$object->activation_code;
        $code = Crypt::encrypt($key);

        $data['link'] = URL::to('/api/v1/activate-member?token='.$code);
        $data['username'] = $name;
        $data['logo_url'] = getLogoURL();

        try {
            Mail::send('emails.account_verification', ['data' => $data],
                function (Message $message) use ($object) {
                    $message->subject('Activate your account');
                    $message->to($object->email);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send confirmation mail : '.$e->getMessage());
        }
    }

    /**
     * @param  array  $data
     *
     * @throws Exception
     *
     * @return bool
     */
    public function sendResetPasswordLinkMail($data)
    {
        try {
            $data['logo_url'] = getLogoURL();
            Mail::send('auth.passwords.reset', ['data' => $data],
                function (Message $message) use ($data) {
                    $message->subject('Password Reset Request Received');
                    $message->to($data['email']);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send password reset mail, Please contact to your administrator');
        }

        return true;
    }
}
