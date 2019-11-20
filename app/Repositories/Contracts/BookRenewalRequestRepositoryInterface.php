<?php

namespace App\Repositories\Contracts;

use App\Models\BookRenewalRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

/**
 * Interface BookRenewalRequestRepositoryInterface
 */
interface BookRenewalRequestRepositoryInterface
{
    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return BookRenewalRequest|Builder[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  array  $input
     *
     * @return BookRenewalRequest
     */
    public function create($input);

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @return BookRenewalRequest
     */
    public function update($input, $id);

    /**
     * @param  array  $input
     *
     * @return BookRenewalRequest
     */
    public function store($input);

    /**
     * @param  BookRenewalRequest  $bookRenewalRequest
     * @param  int  $status
     *
     * @return bool
     */
    public function updateStatus($bookRenewalRequest, $status);
}
