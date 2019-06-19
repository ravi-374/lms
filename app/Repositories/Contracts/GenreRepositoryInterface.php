<?php


namespace App\Repositories\Contracts;

/**
 * Interface GenreRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface GenreRepositoryInterface
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