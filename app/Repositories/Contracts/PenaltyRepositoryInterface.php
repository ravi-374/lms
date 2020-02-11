<?php

namespace App\Repositories\Contracts;

use App\Models\Penalty;
use Illuminate\Support\Collection;

/**
 * Interface PenaltyRepositoryInterface
 */
interface PenaltyRepositoryInterface
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();

    /**
     * Retrieve all records with given filter criteria
     *
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Penalty[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);
}
