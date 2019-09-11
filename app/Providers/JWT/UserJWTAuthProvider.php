<?php

namespace App\Providers\JWT;


use App\User;
use Tymon\JWTAuth\Providers\Auth\Illuminate;

/**
 * Class UserJWTAuthProvider
 */
class UserJWTAuthProvider extends  Illuminate
{
    /** @var int $id */
    protected $id;

    /**
     *  Authenticate a user via the id.
     *
     * @param mixed $id
     *
     * @return User
     */
    public function byId($id)
    {
        $this->id = $id;

        return User::find($id);
    }

    /**
     * Get the currently authenticated user.
     *
     * @return mixed
     */
    public function user()
    {
        return $this->byId($this->id);
    }
}