<?php

namespace App\Http\Middleware;

use App;
use App\Traits\CommonMiddlewareFunctions;
use Auth;
use Closure;
use Config;
use Illuminate\Support\Facades\Facade;
use JWTAuth;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class MemberAuth
{
    use CommonMiddlewareFunctions;

    public function handle($request, Closure $next)
    {
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

        config()->set( 'auth.defaults.guard', 'member' );
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

        return $next($request);
    }
}