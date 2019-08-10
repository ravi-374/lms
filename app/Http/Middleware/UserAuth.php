<?php

namespace App\Http\Middleware;

use App;
use App\Traits\CommonMiddlewareFunctions;
use App\User;
use Auth;
use Closure;
use Config;
use Illuminate\Support\Facades\Facade;
use Illuminate\Validation\UnauthorizedException;
use JWTAuth;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class UserAuth
 * @package App\Http\Middleware
 */
class UserAuth
{
    use CommonMiddlewareFunctions;

    /**
     * @param $request
     * @param Closure $next
     *
     * @throws JWTException
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $payload = JWTAuth::getPayload()->get('issued_for');
        if ($payload != 'user') {
            throw new UnprocessableEntityHttpException('Invalid token given.');
        }

        $this->app = App::getInstance();
        $this->parser = JWTAuth::parser();
        $this->passable = $request;
        $this->authSuccess = function () {
            return call_user_func([$this, 'authenticationSuccess'], []);
        };

        config()->set('auth.defaults.guard', 'web');
        Config::set('jwt.user', User::class);
        Config::set('auth.providers.members.model', User::class);

        Config::set('jwt.providers.auth', App\Providers\JWT\UserJWTAuthProvider::class);

        Facade::clearResolvedInstance('tymon.jwt.provider.user');
        Facade::clearResolvedInstance('tymon.jwt.provider.auth');
        Facade::clearResolvedInstance('tymon.jwt.auth');

        $this->registerUserProvider();
        $this->registerAuthProvider();
        $this->registerJWTAuth();

        $this->checkJWTAuth();
        /** @var User $user */
        $user = JWTAuth::parseToken()->authenticate();
        Auth::login($user);

        if (!$user->is_active) {
            throw new UnauthorizedException('Your account is not active.', 401);
        }

        return $next($request);
    }
}
