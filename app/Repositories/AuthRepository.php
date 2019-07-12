<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 11:17 AM
 */

namespace App\Repositories;

use App\User;
use Auth;
class AuthRepository
{
    /**
     * @return array
     */
    public function getAppConfig()
    {
        /** @var User $user */
        $user = User::with('roles.perms')->findOrFail(Auth::id());

        return [
            'user' => $user
        ];
    }
}