<?php

namespace App\Providers\JWT;


use App\Models\Member;
use Tymon\JWTAuth\Providers\Auth\Illuminate;

/**
 * Class MemberJWTAuthProvider
 */
class MemberJWTAuthProvider extends Illuminate
{
    /** @var int $id */
    protected $id;

    /**
     *  Authenticate a member via the id.
     *
     * @param mixed $id
     *
     * @return Member
     */
    public function byId($id)
    {
        $this->id = $id;

        return Member::find($id);
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