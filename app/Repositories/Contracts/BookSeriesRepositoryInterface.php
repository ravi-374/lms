<?php
/**
 * Interface BookSeriesRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface BookSeriesRepositoryInterface
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