<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapApiV1Routes();
        $this->mapApiB1Routes();
        $this->mapApiM1Routes();

        $this->mapWebRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->as('api.')
            ->namespace($this->namespace."\\API")
            ->group(base_path('routes/api.php'));
    }

    /**
     * Define the V1 "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiV1Routes()
    {
        Route::prefix('api/v1')
            ->middleware('api')
            ->as('api.v1.')
            ->namespace($this->namespace."\\API\\V1")
            ->group(base_path('routes/api/v1.php'));
    }

    /**
     * Define the B1 "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiB1Routes()
    {
        Route::prefix('api/b1')
            ->middleware('api')
            ->as('api.b1.')
            ->namespace($this->namespace."\\API\\B1")
            ->group(base_path('routes/api/b1.php'));
    }

    /**
     * Define the M1 "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiM1Routes()
    {
        Route::prefix('api/m1')
            ->middleware('api')
            ->as('api.m1.')
            ->namespace($this->namespace."\\API\\M1")
            ->group(base_path('routes/api/m1.php'));
    }
}
