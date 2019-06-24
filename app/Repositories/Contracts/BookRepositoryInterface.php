<?php
/**
 * Created by PhpStorm.
 * User: Farhan-InfyOm
 * Date: 6/19/2019
 * Time: 5:47 PM
 */

namespace App\Repositories\Contracts;

/**
 * Interface BookRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface BookRepositoryInterface
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