<?php

namespace App\Repositories\Contracts;

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
     * @param  array  $input
     *
     * @return mixed
     */
    public function penaltyCharge($input);
}
