<?php

namespace App\Http\Middleware;

use App;
use App\Models\Role;
use App\Traits\CommonMiddlewareFunctions;
use App\User;
use Auth;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class UserAuth
 */
class UserAuth
{
    use CommonMiddlewareFunctions;

    /**
     * @param  Request  $request
     * @param  Closure  $next
     *
     * @throws JWTException
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (App::runningUnitTests()) {
            return $next($request);
        }


//        if (App::isLocal() && empty($token)) {
//            /** @var User $user */
//            $user = User::whereEmail('admin@lms.com')->first();
//            if ($user) {
//                Auth::loginUsingId($user->id);
//
//                return $next($request);
//            }
//        }


        /** @var User $user */
        $user = Auth::user();

        if (! $user->hasRole(Role::ROLE_ADMIN) && ! $user->email_verified_at) {
            throw new UnauthorizedException('Please verify your email.', 401);
        }

        if (! $user->is_active) {
            throw new UnauthorizedException('Your account is not active.', 401);
        }

        return $next($request);
    }
}
