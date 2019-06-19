<?php


namespace App\Repositories\Contracts;

/**
 * Interface PublisherRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface PublisherRepositoryInterface
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