<?php


namespace App\Repositories\Contracts;


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