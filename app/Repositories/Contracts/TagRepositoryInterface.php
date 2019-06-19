<?php


namespace App\Repositories\Contracts;

/**
 * Interface TagRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface TagRepositoryInterface
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