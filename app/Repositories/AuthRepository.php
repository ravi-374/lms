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
class AuthRepository
{
    /**
     * @return User
     */
    public function getAppConfig()
    {
        /** @var User $users */
        $users = User::with('roles.perms')->get();

        return $users;
    }
}