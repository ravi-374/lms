<?php
/**
 * Created by PhpStorm.
 * User: Ankit-InfyOm
 * Date: 6/20/2019
 * Time: 1:32 PM
 */

namespace App\Repositories\Contracts;

/**
 * Interface UserRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface UserRepositoryInterface
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();
}