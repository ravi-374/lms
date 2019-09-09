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