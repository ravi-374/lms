<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 *
 * User: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 6/19/2019
 * Time: 3:51 PM
 */

namespace App\Repositories\Contracts;

/**
 * Interface PermissionRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface PermissionRepositoryInterface
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