<?php

namespace App\Repositories\Contracts;

use App\Models\BookItem;
use Illuminate\Support\Collection;

/**
 * Interface BookItemRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface BookItemRepositoryInterface
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
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return BookItem|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     *
     * @return BookItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function searchBooks($search = [], $skip = null, $limit = null);
}