<?php


namespace App\Repositories\Contracts;


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