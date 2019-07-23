<?php
namespace App\Http\Middleware;

use App;
use App\User;
use Auth;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use JWTAuth;

class BackendMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = JWTAuth::getToken();

        if (App::isLocal() && empty($token)) {
            /** @var User $user */
            $user = User::whereEmail('admin@lms.local')->first();
            if ($user) {
                Auth::loginUsingId($user->id);

                return $next($request);
            }
        }

        $jwtAuthClosure =  app(\Tymon\JWTAuth\Http\Middleware\Authenticate::class)->handle($request,
            function ($request) use ($next) {
                return $next($request);
        });

        $user = Auth::user();
        if (!$user->is_active) {
            throw new UnauthorizedException('Your account is not active.', 401);
        }

        return $jwtAuthClosure;
    }
}
