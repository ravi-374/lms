<?php


namespace App\Repositories\Contracts;

/**
 * Interface AuthRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface AuthRepositoryInterface
{
    /**
     * @return array
     */
    public function getAppConfig();
}