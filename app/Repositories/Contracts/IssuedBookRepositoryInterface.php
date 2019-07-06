<?php

namespace App\Repositories\Contracts;

/**
 * Interface IssuedBookRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface IssuedBookRepositoryInterface
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