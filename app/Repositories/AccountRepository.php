<?php
namespace App\Repositories;

use App\Repositories\Contracts\AccountRepositoryInterface;
use Exception;
use Mail;
use URL;

/**
 * Class AccountRepository
 * @package App\Repositories
 */
class AccountRepository implements AccountRepositoryInterface
{
    /**
     * @param  string $username
     * @param  string $email
     * @param  string $activateCode
     *
     * @throws Exception
     */
    public function sendConfirmEmail($username, $email, $activateCode)
    {
        $data['link'] = URL::to('/api/v1/members/activate?token='.$activateCode);
        $data['username'] = $username;

        try {
            Mail::send('emails.account_verification', ['data' => $data],
                function ($message) use ($email) {
                    $message->subject('Activate your account');
                    $message->to($email);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send confirmation mail.');
        }
    }

    /**
     * @param array $data
     *
     * @throws Exception
     *
     * @return bool
     */
    public function sendResetPasswordLinkMail($data)
    {
        try {
            Mail::send('auth.passwords.reset', ['data' => $data],
                function ($message) use ($data) {
                    $message->subject('Password Reset Request Received');
                    $message->to($data['email']);
                });

        } catch (Exception $e) {
            throw new Exception('Unable to send password reset mail, Please contact to your administrator');
        }

        return true;
    }
}