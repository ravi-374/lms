<?php
/**
 * Interface SeriesBookRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface SeriesBookRepositoryInterface
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