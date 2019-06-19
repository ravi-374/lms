<?php


namespace App\Repositories\Contracts;

/**
 * Interface AuthorRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface AuthorRepositoryInterface
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