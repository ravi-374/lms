<?php


namespace App\Repositories\Contracts;

use App\Models\MembershipPlan;
use Exception;
/**
 * Interface MembershipPlanRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface MembershipPlanRepositoryInterface
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
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param array $input
     *
     * @throws Exception
     * @return MembershipPlan
     */
    public function store($input);

    /**
     * @param array $input
     * @param int $id
     *
     * @return MembershipPlan
     */
    public function update($input, $id);
}