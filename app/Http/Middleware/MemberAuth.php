<?php

namespace App\Http\Middleware;

use App;
use App\Traits\CommonMiddlewareFunctions;
use App\User;
use Auth;
use Closure;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;
use Illuminate\Validation\UnauthorizedException;
use JWTAuth;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;

class MemberAuth
{
    use CommonMiddlewareFunctions;

    /**
     * @param  Request  $request
     * @param  Closure  $next
     * @param  string|null  $guard
     *
     * @throws JWTException
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if ($request->user()) {
            return $next($request);
        }

        $token = JWTAuth::getToken();

        if (App::isLocal() && empty($token)) {
            /** @var User $user */
            $user = User::whereEmail('admin@lms.local')->first();
            if ($user) {
                Auth::loginUsingId($user->id);

                return $next($request);
            }
        }

        $payload = JWTAuth::parseToken()->getPayload()->get('issued_for');
        if ($payload != 'member') {
            throw new UnprocessableEntityHttpException('Invalid token given.');
        }

        $this->app = App::getInstance();
        $this->parser = JWTAuth::parser();
        $this->passable = $request;
        $this->authSuccess = function () {
            return call_user_func([$this, 'authenticationSuccess'], []);
        };

        config()->set('auth.defaults.guard', 'member');
        Config::set('jwt.user', App\Models\Member::class);
        Config::set('auth.providers.members.model', App\Models\Member::class);

        Config::set('jwt.providers.auth', App\Providers\JWT\MemberJWTAuthProvider::class);

        Facade::clearResolvedInstance('tymon.jwt.provider.user');
        Facade::clearResolvedInstance('tymon.jwt.provider.auth');
        Facade::clearResolvedInstance('tymon.jwt.auth');

        $this->registerUserProvider();
        $this->registerAuthProvider();
        $this->registerJWTAuth();

        $this->checkJWTAuth();
        /** @var App\Models\Member $member */
        $member = JWTAuth::parseToken()->authenticate();
        Auth::loginUsingId($member->id);

        if (! $member->is_active) {
            throw new UnauthorizedException('Your account is not active.', 401);
        }

        return $next($request);
    }
}
