<?php

namespace App\Http\Middleware;

use App;
use App\User;
use Auth;
use Closure;
use Illuminate\Http\Request;

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
        if (App::isLocal()) {
            /** @var User $user */
            $user = User::whereEmail('admin@lms.local')->first();
            if ($user) {
                Auth::loginUsingId($user->id);

                return $next($request);
            }
        }

        return app(\Tymon\JWTAuth\Http\Middleware\Authenticate::class)->handle($request,
            function ($request) use ($next) {
                return $next($request);
            });
    }
}
