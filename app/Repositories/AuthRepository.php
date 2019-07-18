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

/**
 * Class AuthRepository
 * @package App\Repositories
 */
class AuthRepository
{
    /**
     * @return array
     */
    public function getAppConfig()
    {
        /** @var User $user */
        $userDBRecord = User::findOrFail(Auth::id());

        $userDetails = $userDBRecord->toArray();
        $roles = $userDBRecord->roles->toArray();
        $permissions = [];
        foreach ($userDBRecord->roles as $role) {
            $permissions = array_merge($permissions, $role->perms->toArray());
        }

        return [
            'user'        => $userDetails,
            'roles'       => $roles,
            'permissions' => $permissions,
        ];
    }
}