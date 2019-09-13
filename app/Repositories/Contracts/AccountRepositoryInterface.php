<?php


namespace App\Repositories\Contracts;

use Exception;

/**
 * Interface AccountRepositoryInterface
 */
interface AccountRepositoryInterface
{
    /**
     * @param  string  $username
     * @param  string  $email
     * @param  string  $activateCode
     * @throws Exception
     */
    public function sendConfirmEmail($username, $email, $activateCode);

    /**
     * @param  array  $data
     *
     * @throws Exception
     *
     * @return bool
     */
    public function sendResetPasswordLinkMail($data);
}