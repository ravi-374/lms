<?php

namespace App\Repositories;

use Exception;
use Mail;
use URL;

class AccountRepository
{
    /**
     * @param  string  $username
     * @param  string  $email
     * @param  string  $activateCode
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
}